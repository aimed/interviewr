import * as React from 'react';

import ApolloClient from 'apollo-client';
import { Button } from '@hydrokit/button';
import gql from 'graphql-tag';
import { withApollo } from 'react-apollo';

export interface UserLogoutButtonProps {}

export const UserLogoutButton = withApollo((props: { client: ApolloClient<{}> }) => {
    const onClick = async () => {
        await props.client.query({ query: gql`
        query Logout {
            logout {
                viewer {
                    id
                    user {
                        id
                    }
                }
            }
        }
        `});
        
        props.client.resetStore();
    };
    
    return (
        <Button onClick={onClick}>Logout</Button>
    );
});
