import * as React from 'react';

// tslint:disable-next-line:max-line-length
import { EducationCreateInput, EducationCreateMutation, EducationCreateMutationVariables } from '../operation-result-types';
import { ExecutionResult, Mutation, MutationFn, MutationResult } from 'react-apollo';

import { Button } from '@hydrokit/button';
import { FieldGroup } from '../common/FieldGroup';
import { MobxForm } from '../common/MobxForm';
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

export interface EducationCreateFormState { }
export interface EducationCreateFormProps {
    mutate: MutationFn<EducationCreateMutation, EducationCreateMutationVariables>;
    // tslint:disable-next-line:no-any
    onResult?: (result: ExecutionResult<EducationCreateMutation> | void) => any;
}

export class EducationCreateForm extends React.Component<EducationCreateFormProps, EducationCreateFormState> {
    form = new MobxForm<EducationCreateInput>({
        institution: { defaultValue: '', label: 'Institution' },
        degree: { defaultValue: '', label: 'Degree' },
        description: { defaultValue: '', label: 'Description' },
        startDate: { defaultValue: '', label: 'Start date' },
        endDate: { defaultValue: '', label: 'End date' }
    });

    onSubmit = async (input: EducationCreateInput) => {
        if (!this.props.mutate) {
            return;
        }

        const opts = { variables: { input } };
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

    render() {
        // const {
        //     submit, 
        //     submitting
        // } = this.form;

        // const {
        //     institution,
        //     degree,
        //     description,
        //     startDate,
        //     endDate
        // } = this.form.fields;

        return (
            <form>
                <FieldGroup>
                    <Button />
                </FieldGroup>
            </form>
        );
    }
}

// tslint:disable-next-line:max-line-length
// export const EducationCreateFormWithData = graphql<EducationCreateMutation, EducationCreateFormProps>(EDUCATION_CREATE)(EducationCreateForm);

export const EducationCreateFormWithData = () => (
    // tslint:disable-next-line:max-line-length
    <Mutation mutation={EDUCATION_CREATE}>{(educationCreate: MutationFn<EducationCreateMutation, EducationCreateMutationVariables>, { data }: MutationResult<EducationCreateMutation>) => {
        return (
            <EducationCreateForm mutate={educationCreate} />
        );
    }}</Mutation>
);
