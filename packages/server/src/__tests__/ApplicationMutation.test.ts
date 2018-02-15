import { connect, createContextWithUser, getGlobalId } from './__mockery';

import { Connection } from 'typeorm';
import { Education } from '../entities/Education';
import { Personal } from '../entities/Personal';
import { Skill } from '../entities/Skill';
import { SkillGroup } from '../entities/SkillGroup';
import { Work } from '../entities/Work';
import { graphql } from 'graphql';
import { schema } from '../graphql/schema';

let connection: Connection;

beforeAll(async () => {
    connection = await connect();
});

describe('Application mutation', () => {
    it('should create', async () => {
        const context = await createContextWithUser(connection);
        const user = await context.authService.getRequestUser();

        const personalRepo = connection.getRepository(Personal);
        const personal = personalRepo.create({ firstName: 'firstName' });
        await personalRepo.save(personal);

        const skillGroupRepo = connection.getRepository(SkillGroup);
        const skillGroup = skillGroupRepo.create({ title: 'aSkillGroup' });
        await skillGroupRepo.save(skillGroup);

        const skillRepo = connection.getRepository(Skill);
        const skill = skillRepo.create({ description: 'aSkill', group: Promise.resolve(skillGroup) });
        await skillRepo.save(skill);

        const educationRepo = connection.getRepository(Education);
        const education = educationRepo.create({
            institution: '', degree: '', startDate: new Date(), description: '', user: Promise.resolve(user)
        });
        await educationRepo.save(education);

        const workRepo = connection.getRepository(Work);
        const work = workRepo.create({
            employer: '', startDate: new Date(), description: '', user: Promise.resolve(user)
        });
        await workRepo.save(work);

        const input = {
            text: 'some application text',
            personal: getGlobalId(personal),
            skills: [skill].map(getGlobalId),
            work: [work].map(getGlobalId),
            education: [education].map(getGlobalId)
        };

        const result = await graphql(schema, `
            mutation ApplicationCreate($input: ApplicationCreateInput!) {
                ApplicationCreate(input: $input) {
                    viewer {
                        user {
                            id
                        }
                    }

                    application {
                        id
                    }
                }
            }
        `, null, context, { input });

        if (result.errors) {
            throw result.errors[0];
        }
    });
});
