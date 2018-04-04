import * as React from 'react';

import { ChildProps, MutationOpts, graphql } from 'react-apollo';
import { WorkCreateInput, WorkCreateMutation, WorkCreateMutationVariables } from '../operation-result-types';

import { ApolloQueryResult } from 'apollo-client';
import { Button } from '@hydrokit/button';
import { FieldGroup } from '../common/FieldGroup';
import { FormTextField } from '../common/HydrokitFormConnector';
import { MobxForm } from '../common/MobxForm';
import gql from 'graphql-tag';

export interface WorkCreateFormState { }
export interface WorkCreateFormProps extends ChildProps<{}, WorkCreateMutation> {
    onResult?: (result: ApolloQueryResult<WorkCreateMutation>) => void;
}

export class WorkCreateForm extends React.Component<WorkCreateFormProps, WorkCreateFormState> {
    form = new MobxForm<WorkCreateInput>({
        startDate: { defaultValue: '', label: 'Start date' },
        description: { defaultValue: '', label: 'Description' },
        employer: { defaultValue: '', label: 'Emloyer' },
        endDate: { defaultValue: '', label: 'End date' },
        role: { defaultValue: '', label: 'Role' }
    });

    onSubmit = async (input: WorkCreateInput) => {
        if (!this.props.mutate) {
            return;
        }

        const opts: MutationOpts<WorkCreateMutationVariables> = { variables: { input } };
        try {
            const result = await this.props.mutate(opts);
            if (this.props.onResult) {
                this.props.onResult(result);
            }
            // tslint:disable-next-line:no-console
            console.info(result);
        } catch (err) {
            console.warn(err);
        }
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
                <FieldGroup>
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

export const WorkCreateFormWithData = graphql<WorkCreateMutation, WorkCreateFormProps>(gql`
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
`)(WorkCreateForm);