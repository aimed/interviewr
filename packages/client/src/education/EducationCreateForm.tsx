import * as React from 'react';

import { ChildProps, MutationOpts, graphql } from 'react-apollo';
// tslint:disable-next-line:max-line-length
import { EducationCreateInput, EducationCreateMutation, EducationCreateMutationVariables } from '../operation-result-types';

import { ApolloQueryResult } from 'apollo-client';
import { Button } from '@hydrokit/button';
import { FieldGroup } from '../common/FieldGroup';
import { MobxForm } from '../common/MobxForm';
import gql from 'graphql-tag';

export interface EducationCreateFormState { }
export interface EducationCreateFormProps extends ChildProps<{}, EducationCreateMutation> {
    // tslint:disable-next-line:no-any
    onResult?: (result: ApolloQueryResult<EducationCreateMutation>) => any;
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

        const opts: MutationOpts<EducationCreateMutationVariables> = { variables: { input } };
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

export const EducationCreateFormWithData = graphql<EducationCreateMutation, EducationCreateFormProps>(gql`
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
`)(EducationCreateForm);
