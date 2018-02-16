import * as React from 'react';

import { ChildProps, MutationOpts, graphql } from 'react-apollo';
import { UserCreateInput, UserCreateMutation, UserCreateMutationVariables } from '../operation-result-types';

import { Button } from '@hydrokit/button';
import { FormTextField } from '../common/HydrokitFormConnector';
import { MobxForm } from '../common/MobxForm';
import gql from 'graphql-tag';
import { observer } from 'mobx-react';

export interface UserCreateFormState {}
export interface UserCreateFormProps extends ChildProps<{}, UserCreateMutation> {}

@observer
export class UserCreateForm extends React.Component<UserCreateFormProps, UserCreateFormState> {
    form = new MobxForm<UserCreateInput>({
        email: {
            label: 'Email',
            defaultValue: ''
        },
        password: {
            label: 'Password',
            defaultValue: ''
        }
    });

    onCreate = async (input: UserCreateInput) => {
        if (!this.props.mutate) {
            return;
        }
        const opts: MutationOpts<UserCreateMutationVariables> = { variables: { input } };
        try {
            const result = await this.props.mutate(opts);
            console.warn('r', result);
        } catch (error) {
            console.warn('e', error);
        }
    }

    render() {
        const { submit, submitting } = this.form;
        const { email, password } = this.form.fields;
        return (
            <form onSubmit={submit(this.onCreate)}>
                <FormTextField field={email} />
                <FormTextField field={password} type="password" />
                <Button primary={true}>{submitting ? 'Signing up...' : 'Sign up'}</Button>
            </form>
        );
    }
}

export const UserCreateFormWithData = graphql(gql`
mutation UserCreate($input: UserCreateInput!) {
    UserCreate(input: $input) {
        token
        viewer {
            id
            user {
                id
            }
        }
    }
}
`)(UserCreateForm);
