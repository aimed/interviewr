import * as React from 'react';

import { Query, QueryResult } from 'react-apollo';

import { AuthProviderQuery } from '../operation-result-types';
import gql from 'graphql-tag';

export interface AuthProviderProps {
    children: (isAuthenticated: boolean) => JSX.Element[] | JSX.Element | null | undefined | React.ReactNode;
}

const QUERY = gql`
query AuthProvider {
    viewer {
        id
        user {
            id
        }
    }
}
`;
export const AuthProvider = (props: AuthProviderProps) => (
    // Use cache first to prevent always checking the auth status.
    // Loading it initially should be good enough.
    <Query query={QUERY} fetchPolicy="cache-first">
        {({ data }: QueryResult<AuthProviderQuery>) => data ? props.children(!!data.viewer) : null}
    </Query>
);
