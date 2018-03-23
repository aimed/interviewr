import * as React from 'react';

import { WorkCreateInput, WorkCreateMutation } from '../operation-result-types';

import { FieldGroup } from '../common/FieldGroup';
import { FormTextField } from '../common/HydrokitFormConnector';
import { MobxForm } from '../common/MobxForm';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export interface WorkCreateFormState { }
export interface WorkCreateFormProps { }

export class WorkCreateForm extends React.Component<WorkCreateFormProps, WorkCreateFormState> {
    form = new MobxForm<WorkCreateInput>({
        startDate: { defaultValue: '', label: 'Start date' },
        description: { defaultValue: '', label: 'Description' },
        employer: { defaultValue: '', label: 'Emloyer' },
        endDate: { defaultValue: '', label: 'End date' },
        role: { defaultValue: '', label: 'Role' }
    });

    render() {
        const {
            role,
            employer,
            description,
            startDate,
            endDate
        } = this.form.fields;
        
        return (
            <form action="">
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