import * as React from 'react';

// tslint:disable-next-line:max-line-length
import { EducationCreateInput, EducationCreateMutation, EducationCreateMutationVariables } from '../operation-result-types';
import { Mutation, MutationFn } from 'react-apollo';

import { Button } from '@hydrokit/button';
import { FieldGroup } from '../common/FieldGroup';
import { FormTextField } from '../common/HydrokitFormConnector';
import { MobxForm } from '../common/MobxForm';
import { MutationFormProps } from '../utils/hydrokit_graphql_utils';
import gql from 'graphql-tag';

const EDUCATION_CREATE = gql`
mutation EducationCreate($input: EducationCreateInput!) {
    EducationCreate(input: $input) {
        viewer {
            id
            user {
                id
                education {
                    id
                }
            }
        }
        
        education {
            id
        }
    }
}
`;

// tslint:disable-next-line:no-any
export interface EducationCreateFormState { }
export interface EducationCreateFormProps extends MutationFormProps<EducationCreateMutation> {
    mutate: MutationFn<EducationCreateMutation, EducationCreateMutationVariables>;
}

export class EducationCreateForm extends React.Component<EducationCreateFormProps, EducationCreateFormState> {
    form = new MobxForm<EducationCreateInput>({
        institution: { defaultValue: '', label: 'Institution' },
        degree: { defaultValue: '', label: 'Degree' },
        description: { defaultValue: '', label: 'Description' },
        startDate: { defaultValue: '', label: 'Start date' },
        endDate: { defaultValue: '', label: 'End date' }
    });

    onSubmit = (input: EducationCreateInput) => {
        const opts = { variables: { input } };
        return this.props.mutate(opts).then(this.props.onResult).catch(this.props.onError);
    }

    render() {
        const {
            submit, 
            submitting
        } = this.form;

        const {
            institution,
            degree,
            description,
            startDate,
            endDate
        } = this.form.fields;

        return (
            <form onSubmit={submit(this.onSubmit)}>
                <FieldGroup inline>
                    <FormTextField field={institution} />
                    <FormTextField field={degree} />
                </FieldGroup>
                <FieldGroup>
                    <FormTextField field={description} />
                </FieldGroup>
                <FieldGroup>
                    <FormTextField field={startDate} />
                    <FormTextField field={endDate} />
                </FieldGroup>
                <FieldGroup>
                    <Button primary type="submit" disabled={submitting} label="Submit" />
                </FieldGroup>
            </form>
        );
    }
}

// tslint:disable-next-line:max-line-length
export const EducationCreateFormWithData = (props: MutationFormProps<EducationCreateMutation>) => (
    // tslint:disable-next-line:max-line-length
    <Mutation mutation={EDUCATION_CREATE}>{(educationCreate: MutationFn<EducationCreateMutation, EducationCreateMutationVariables>) => {
        return (
            <EducationCreateForm mutate={educationCreate} {...props} />
        );
    }}</Mutation>
);
