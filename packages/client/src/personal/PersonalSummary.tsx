import * as React from 'react';

import { PersonalSummaryQuery, PersonalSummaryQueryVariables } from '../operation-result-types';
import { Query, QueryResult } from 'react-apollo';

import gql from 'graphql-tag';

export interface PersonalSummaryState { }
export interface PersonalSummaryProps {
    personalId: string;
}

// tslint:disable-next-line:max-line-length
export class PersonalSummary extends React.Component<PersonalSummaryQuery, PersonalSummaryState> {
    render() {
        const node = this.props.node;

        if (!node || !('firstName' in node)) {
            return null;
        }

        return (
            <div className="personal-summary">
                <span>{node.firstName}</span>
                <span>{node.lastName}</span>
            </div>
        );
    }
}

const PERSONAL_SUMMARY_QUERY = gql`
query PersonalSummary($id: ID!) {
    node(id: $id) {
        ... on Personal {
            firstName
            lastName
        }
    }
}
`;

// tslint:disable-next-line:max-line-length
export const PersonalSummaryWithData = (props: PersonalSummaryProps) => {
    return (
        // tslint:disable-next-line:max-line-length
        <Query query={PERSONAL_SUMMARY_QUERY}>{(result: QueryResult<PersonalSummaryQuery, PersonalSummaryQueryVariables>) => {
            if (result.loading || !result.data) {
                return null;
            }
            return (
                <PersonalSummary {...result.data} />
            );
        }}</Query>
    );
};