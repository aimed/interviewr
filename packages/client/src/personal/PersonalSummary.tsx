import * as React from 'react';

import { ChildProps, graphql } from 'react-apollo';

import { PersonalSummaryQuery } from '../operation-result-types';
import gql from 'graphql-tag';

export interface PersonalSummaryState { }
export interface PersonalSummaryProps {
    personalId: string;
}

type Props = ChildProps<PersonalSummaryProps, PersonalSummaryQuery>;
// tslint:disable-next-line:max-line-length
export class PersonalSummary extends React.Component<Props, PersonalSummaryState> {
    render() {
        // tslint:disable-next-line:no-console
        console.log(this.props);
        
        const { data } = this.props;

        if (!data || !data.node) {
            return null;
        }
        const node = data.node;
        return (
            <div className="personal-summary">
                <span>{'firstName' in node ? node.firstName : ''}</span>
                <span>{'lastName' in  node ? node.lastName : ''}</span>
            </div>
        );
    }
}

// tslint:disable-next-line:max-line-length
export const PersonalSummaryWithData = graphql<PersonalSummaryQuery, PersonalSummaryProps>(gql`
query PersonalSummary($id: ID!) {
    node(id: $id) {
        ... on Personal {
            firstName
            lastName
        }
    }
}
`,
    // tslint:disable-next-line:align
    {
        options: (props) => ({ variables: { id: props.personalId }})
    })(PersonalSummary);
