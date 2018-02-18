import * as React from 'react';

import ApolloClient from 'apollo-client';
import { Button } from '@hydrokit/button';
import { FormField } from '@hydrokit/formfield';
import { FormTextField } from '../common/HydrokitFormConnector';
import { LoginQueryVariables } from '../operation-result-types';
import { MobxForm } from '../common/MobxForm';
import gql from 'graphql-tag';
import { observer } from 'mobx-react';
import { withApollo } from 'react-apollo';

const loginQuery = gql`
query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        viewer {
            id
            user {
                id
            }
        }
    }
}
`;

export interface UserLoginFormState { }
export interface UserLoginFormProps {
    client: ApolloClient<{}>;
}

@observer
export class UserLoginForm extends React.Component<UserLoginFormProps, UserLoginFormState> {
    form = new MobxForm<LoginQueryVariables>({
        email: { defaultValue: '' },
        password: { defaultValue: '' }
    });

    login = async (variables: LoginQueryVariables) => {
        try {
            await this.props.client.query({ query: loginQuery, variables });
        } catch (error) {
            console.warn(error);
        }
    }

    render() {
        const { submit, submitting } = this.form;
        const { email, password } = this.form.fields;
        return (
            <form onSubmit={submit(this.login)}>
                <FormTextField field={email} placeholder="Email" />
                <FormTextField field={password} placeholder="Password" />
                <FormField>
                    <Button type="submit">{submitting ? 'Signin in...' : 'Sign in'}</Button>
                </FormField>
            </form>
        );
    }
}

export const UserLoginFormWithData = withApollo(UserLoginForm);
