import './application-page.css';

import * as React from 'react';

import { ApplicationPageQuery, ApplicationPageQueryVariables } from '../operation-result-types';
import { ApplicationSkills, Skill, SkillGroup } from './ApplicationSkills';
import { Query, QueryResult } from 'react-apollo';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';

import { ApplicationEducation } from './ApplicationEducation';
import { ApplicationFooter } from './ApplicationFooter';
import { ApplicationPersonal } from './ApplicationPersonal';
import { ApplicationWorkExperience } from './ApplicationWorkExperience';
import { LoaderScreen } from 'common/LoaderScreen';
import gql from 'graphql-tag';

export const APPLICATION_PAGE_QUERY = gql`
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
            <div className="application-page__experience-and-skills">
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
            <ApplicationFooter />
        </div>
    );
};

export const ApplicationPageWithData = withRouter<RouteComponentProps<RouteParams>>(routeProps => {
    const variables: ApplicationPageQueryVariables = {accessCode: routeProps.match.params.accessCode};
    return (
        <Query query={APPLICATION_PAGE_QUERY} variables={variables} fetchPolicy="cache-first">{(result: QueryResult<ApplicationPageQuery, ApplicationPageQueryVariables>) => {
            if (result.loading) {
                return (
                    <LoaderScreen loading />
                );
            }

            if (!result.data || !result.data.application) {
                return (
                    <Redirect to={{ pathname: '/', state: { oopsie: true } }} />
                );
            }
            
            return <ApplicationPage data={result.data} />;
        }}</Query>
    );
});
