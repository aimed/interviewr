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
import i18next from 'i18next';

i18next.init({
    ns: ['application'],
    languages: ['de', 'en'],
    interpolation: {
        escapeValue: false, // not needed for react!!
    }
});

export const APPLICATION_PAGE_QUERY = gql`
    query ApplicationPage($accessCode: String!) {
        application(accessCode: $accessCode) {
            id
            color
            
            locale
            i18n

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
    const locale = props.data.application.locale;

    if (!i18next.hasResourceBundle(locale, 'application')) {
        const i18nStrings = JSON.parse(props.data.application.i18n);
        i18next.addResourceBundle(locale, 'application', i18nStrings, true, true);
    }
    i18next.changeLanguage(locale);

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
    const variables: ApplicationPageQueryVariables = { accessCode: routeProps.match.params.accessCode };
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
