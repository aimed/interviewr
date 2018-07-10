import 'isomorphic-fetch';

import * as YAML from 'js-yaml';
import * as fs from 'fs';
import * as path from 'path';

import { Arg, Query, Resolver } from 'type-graphql';

import { Application } from '../entities/Application';
import { Dropbox } from 'dropbox';

// TODO: The property is currently not exposed by the dropbox type declaration.
interface FileMetadataWithBlob extends DropboxTypes.files.FileMetadata {
    fileBinary: Buffer | undefined;
}

@Resolver(type => Application)
export class ApplicationResolver {
    /**
     * Dropbox SDK.
     */
    private dropbox = new Dropbox({ accessToken: process.env.DROPBOX_KEY });

    /**
     * Resolve an application.
     * @param accessCode Access code for the application.
     */
    @Query(returns => Application, { nullable: true })
    public async application(
        @Arg('accessCode') accessCode: string
    ) {
        // IMPORTANT: Perform a security check to prevent reading arbitrary files.
        if (!accessCode.match(/^[a-zA-Z0-9\-\_]+$/)) {
            return null;
        }

        // Check if the file exists on the server.
        const localYAMLFilePath = path.resolve(__dirname, `../../data/${accessCode}.yaml`);
        const localYAMLFileExists = fs.existsSync(localYAMLFilePath);

        if (localYAMLFileExists) {
            try {
                const fileContents = fs.readFileSync(localYAMLFilePath, 'utf8');
                const parsed = YAML.safeLoad(fileContents);
                return parsed;
            } catch (error) {
                return null;
            }
        }

        // Check if the file exists on dropbox.
        try {
            const download = await this.dropbox.filesDownload({ path: `/${accessCode}.yaml` }) as FileMetadataWithBlob;
            const binary = download.fileBinary;
            const yamlString = binary.toString();
            const parsed = YAML.safeLoad(yamlString);
            return parsed;
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.error(error);
        }

        return null;
    }
}
