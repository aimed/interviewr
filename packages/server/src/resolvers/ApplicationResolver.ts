import 'isomorphic-fetch';

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
        const localFilePath = path.resolve(__dirname, `../../data/${accessCode}.json`);
        const localFileExists = fs.existsSync(localFilePath);

        if (localFileExists) {
            try {
                const fileContents = fs.readFileSync(localFilePath).toString();
                const parsed = JSON.parse(fileContents);
                return parsed;
            } catch (error) {
                return null;
            }
        }

        // Check if the file exists on dropbox.
        try {
            const download = await this.dropbox.filesDownload({ path: `/${accessCode}.json` }) as FileMetadataWithBlob;
            const binary = download.fileBinary;
            const jsonString = binary.toString();
            const parsed = JSON.parse(jsonString);
            return parsed;
        } catch (error) {
            // tslint:disable-next-line:no-console
            console.error(error);
            return null;
        }
    }
}
