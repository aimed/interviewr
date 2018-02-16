import * as React from 'react';

import { AuthProviderQuery } from '../operation-result-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export interface AuthProviderProps {
    children: (isAuthenticated: boolean) => JSX.Element;
}

export const AuthProvider: React.ComponentClass<AuthProviderProps> = graphql<AuthProviderQuery, AuthProviderProps>(gql`
query AuthProvider {
    viewer {
        id
        user {
            id
            email
        }
    }
}
`)(({ data, children }) => {
    if (!data || data.loading) {
        return null;
    }
    
    return (
        children(!!(data.viewer && data.viewer.user))
    );
});
