import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';

import { Application } from '../../entities/Application';
import { EducationType } from './EducationType';
import { PersonalDataType } from './PersonalDataType';
import { SkillType } from './SkillType';
import { UserType } from './UserType';
import { WorkType } from './WorkType';
import { graphQLReflector } from '../GraphQLReflector';
import { graphlQLObjectName } from '../utils';
import { nodeInterface } from '../nodeDefinitions';

export const ApplicationType = new GraphQLObjectType({
    name: graphlQLObjectName(Application),
    interfaces: [nodeInterface],
    fields: () => ({
        ...graphQLReflector.getOutputFields(Application),
        personal: { type: PersonalDataType },
        work: { type: new GraphQLNonNull(new GraphQLList(WorkType)) },
        education: { type: new GraphQLNonNull(new GraphQLList(EducationType)) },
        user: { type: UserType },
        skills: { type: new GraphQLNonNull(new GraphQLList(SkillType)) }
    })
});
