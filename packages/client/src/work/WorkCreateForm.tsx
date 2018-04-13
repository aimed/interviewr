import * as React from 'react';

import { Mutation, MutationFn } from 'react-apollo';
import { MutationFormChildProps, MutationFormProps } from '../utils/hydrokit_graphql_utils';
import { WorkCreateInput, WorkCreateMutation, WorkCreateMutationVariables } from '../operation-result-types';

import { Button } from '@hydrokit/button';
import { FieldGroup } from '../common/FieldGroup';
import { FormTextField } from '../common/HydrokitFormConnector';
import { MobxForm } from '../common/MobxForm';
import gql from 'graphql-tag';

export interface WorkCreateFormState { }
export interface WorkCreateFormProps extends MutationFormChildProps<WorkCreateMutation, WorkCreateMutationVariables> {}

export class WorkCreateForm extends React.Component<WorkCreateFormProps, WorkCreateFormState> {
    form = new MobxForm<WorkCreateInput>({
        startDate: { defaultValue: '', label: 'Start date' },
        description: { defaultValue: '', label: 'Description' },
        employer: { defaultValue: '', label: 'Emloyer' },
        endDate: { defaultValue: '', label: 'End date' },
        role: { defaultValue: '', label: 'Role' }
    });

    onSubmit = (input: WorkCreateInput) => {
        const opts = { variables: { input } };
        return this.props.mutate(opts).then(this.props.onResult).catch(this.props.onError);
    }

    footer(submitting: boolean) {
        return <Button primary>{submitting ? 'Submitting...' : 'Submit'}</Button>;
    }

    render() {
        const {
            submit,
            submitting
        } = this.form;
        
        const {
            role,
            employer,
            description,
            startDate,
            endDate
        } = this.form.fields;
        
        return (
            <form onSubmit={submit(this.onSubmit)}>
                <FieldGroup inline>
                    <FormTextField field={employer} />
                    <FormTextField field={role} />
                </FieldGroup>
                <FieldGroup>
                    <FormTextField field={description} />
                </FieldGroup>
                <FieldGroup inline>
                    <FormTextField field={startDate} />
                    <FormTextField field={endDate} />
                </FieldGroup>
                <FieldGroup>
                    {this.footer(submitting)}
                </FieldGroup>
            </form>
        );
    }
}

const WORK_CREATE_MUTATION = gql`
mutation WorkCreate($input: WorkCreateInput!) {
    WorkCreate(input: $input) {
        viewer {
            id
            user {
                id
                work {
                    id
                }
            }
        }
        
        work {
            id
        }
    }
}
`;
export const WorkCreateFormWithData = (props: MutationFormProps<WorkCreateMutation>) => (
    <Mutation mutation={WORK_CREATE_MUTATION}>
    {(workCreate: MutationFn<WorkCreateMutation>) =>
        <WorkCreateForm mutate={workCreate} {...props} />
    }
    </Mutation>  
);