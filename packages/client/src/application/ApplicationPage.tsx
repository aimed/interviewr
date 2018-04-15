import './application-page.css';

import * as React from 'react';

import { ApplicationPageQuery, ApplicationPageQueryVariables } from '../operation-result-types';
import { ApplicationSkills, Skill, SkillGroup } from './ApplicationSkills';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps, withRouter } from 'react-router';

import { ApplicationEducation } from './ApplicationEducation';
import { ApplicationPersonal } from './ApplicationPersonal';
import { ApplicationWorkExperience } from './ApplicationWorkExperience';
import gql from 'graphql-tag';

const QUERY = gql`
    query ApplicationPage($accessCode: String!) {
        application(accessCode: $accessCode) {
            id
            personal {
                ...ApplicationPersonalPersonal
            }
            ...ApplicationEducationApplication
            ...ApplicationWorkExperienceApplication
        }
    }
    ${ApplicationPersonal.fragments.personal}
    ${ApplicationEducation.fragments.application}
    ${ApplicationEducation.fragments.education}
    ${ApplicationWorkExperience.fragments.application}
    ${ApplicationWorkExperience.fragments.work}
`;

interface RouteParams {
    accessCode: string;
}
// tslint:disable:max-line-length
const gravatar = 'https://en.gravatar.com/userimage/24124275/acf9df1a3eb03a58a263aed5c1bff778.jpg?size=200';

const programmingGroup: SkillGroup = {
    id: '1',
    title: 'Programming languages and Frameworks'
};

const skills: Skill[] = [{
    id: '1',
    description: '> 20 years eagerness to learn',
    group: programmingGroup
}, {
    id: '2',
    description: 'React',
    group: programmingGroup
}];

export interface ApplicationPageProps {
    data: ApplicationPageQuery;
}

export const ApplicationPage: React.StatelessComponent<ApplicationPageProps> = props => {
    if (!props.data.application) {
        return null;
    }
    return (
        <div className="application-page">
            <ApplicationPersonal
                data={props.data.application.personal}
                profileImageUrl={gravatar}
            />
            <ApplicationWorkExperience
                data={props.data.application}
            />
            <ApplicationEducation
                data={props.data.application}
            />
            <ApplicationSkills
                skills={skills}
            />
        </div>
    );
};

export const ApplicationPageWithData = withRouter<RouteComponentProps<RouteParams>>(routeProps => {
    const variables: ApplicationPageQueryVariables = {accessCode: routeProps.match.params.accessCode};
    return (
        <Query query={QUERY} variables={variables}>{(result: QueryResult<ApplicationPageQuery, ApplicationPageQueryVariables>) => {
            if (result.loading || !result.data) {
                return null;
            }
            
            return <ApplicationPage data={result.data} />;
        }}</Query>
    );
});
