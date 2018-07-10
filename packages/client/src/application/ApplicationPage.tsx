import './application-page.css';

import * as React from 'react';

import { ApplicationPageQuery, ApplicationPageQueryVariables } from 'operation-result-types';
import { Query, QueryResult } from 'react-apollo';
import { Redirect, RouteComponentProps, withRouter } from 'react-router';

import { ApplicationEducation } from 'education/ApplicationEducation';
import { ApplicationFooter } from 'footer/ApplicationFooter';
import { ApplicationPersonal } from 'personal/ApplicationPersonal';
import { ApplicationSkillGroups } from 'skills/ApplicationSkills';
import { ApplicationWorkExperience } from 'work/ApplicationWorkExperience';
import { LoaderScreen } from 'loader/LoaderScreen';
import gql from 'graphql-tag';

export const APPLICATION_PAGE_QUERY = gql`
    query ApplicationPage($accessCode: String!) {
        application(accessCode: $accessCode) {
            id
            color
            personal {
                ...ApplicationPersonalPersonal
            }
            ...ApplicationEducationApplication
            ...ApplicationWorkExperienceApplication
            ...ApplicationSkillGroupsApplication
        }
    }
    ${ApplicationPersonal.fragments.personal}
    ${ApplicationEducation.fragments.application}
    ${ApplicationWorkExperience.fragments.application}
    ${ApplicationSkillGroups.fragments.application}
`;

interface RouteParams {
    accessCode: string;
}

export interface ApplicationPageProps {
    data: ApplicationPageQuery;
}

export const ApplicationPage: React.StatelessComponent<ApplicationPageProps> = props => {
    if (!props.data.application) {
        return null;
    }
    // tslint:disable-next-line:max-line-length
    const style = (props.data.application.color ? { '--theme-color': props.data.application.color } : {}) as React.CSSProperties;
    return (
        <div className="application-page" style={style}>
            <ApplicationPersonal
                data={props.data.application.personal}
            />
            <div className="application-page__experience-and-skills">
                <ApplicationWorkExperience
                    data={props.data.application}
                />
                <ApplicationEducation
                    data={props.data.application}
                />
                <ApplicationSkillGroups
                    data={props.data.application}
                />
            </div>
            <ApplicationFooter />
        </div>
    );
};

export const ApplicationPageWithData = withRouter<RouteComponentProps<RouteParams>>(routeProps => {
    const variables: ApplicationPageQueryVariables = {accessCode: routeProps.match.params.accessCode};
    return (
        // tslint:disable-next-line:max-line-length
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
