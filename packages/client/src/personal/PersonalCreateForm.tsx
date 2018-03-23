import * as React from 'react';

import { ChildProps, MutationOpts, graphql } from 'react-apollo';
// tslint:disable-next-line:max-line-length
import { PersonalCreateInput, PersonalCreateMutation, PersonalCreateMutationVariables } from '../operation-result-types';

import { Button } from '@hydrokit/button';
import { FieldGroup } from '../common/FieldGroup';
import { FormTextField } from '../common/HydrokitFormConnector';
import { GraphQLError } from 'graphql';
import { MobxForm } from '../common/MobxForm';
import gql from 'graphql-tag';
import { observer } from 'mobx-react';

export interface PersonalCreateFormState { }
export interface PersonalCreateFormProps extends ChildProps<{}, PersonalCreateMutation> {
    header?: JSX.Element;
    footer?: (submit: () => void) => JSX.Element;
    // tslint:disable-next-line:no-any
    onSubmit?: (input: PersonalCreateInput) => any;
    // tslint:disable-next-line:no-any
    onResult?: (result: { data: PersonalCreateMutation, errors?: GraphQLError[] | undefined }) => any;
}

@observer
export class PersonalCreateForm extends React.Component<PersonalCreateFormProps, PersonalCreateFormState> {
    form = new MobxForm<PersonalCreateInput>({
        firstName: { defaultValue: '', label: 'First name' },
        lastName: { defaultValue: '', label: 'Last name' },
        nationality: { defaultValue: '', label: 'Nationality' },
        birthPlace: { defaultValue: '', label: 'Birth place' },
        birthDate: { defaultValue: null, label: 'Birth date' },
        martialStatus: { defaultValue: '', label: 'Martial status' },
        numberOfChildren: { defaultValue: '', label: 'Number of children (and age)' },
        phone: { defaultValue: '', label: 'Phone' },
        addressLine1: { defaultValue: '', label: 'Address line' },
        addressLine2: { defaultValue: '', label: 'Address line' },
        addressLine3: { defaultValue: '', label: 'Address line' },
        addressLine4: { defaultValue: '', label: 'Address line' },
    });

    onSubmit = async (input: PersonalCreateInput) => {
        if (!this.props.mutate) {
            return;
        }

        const opts: MutationOpts<PersonalCreateMutationVariables> = { variables: { input } };
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
        const { submit, submitting } = this.form;
        // tslint:disable-next-line:max-line-length
        const { firstName, lastName, birthDate, birthPlace, nationality, numberOfChildren, martialStatus, phone, addressLine1, addressLine2, addressLine3, addressLine4 } = this.form.fields;
        const { header, footer, onSubmit } = this.props;
        const submitHandle = () => (onSubmit || this.onSubmit)(this.form.values);

        return (
            <form onSubmit={submit(this.onSubmit)}>
                {header}
                <h4>General</h4>
                <FieldGroup inline>
                    <FormTextField field={firstName} name="first_name" />
                    <FormTextField field={lastName} name="last_name" />
                </FieldGroup>
                <h4>Family</h4>
                <FieldGroup>
                    <FormTextField field={martialStatus} />
                    <FormTextField field={numberOfChildren} />
                </FieldGroup>
                <h4>Nationality</h4>
                <FieldGroup>
                    <FormTextField field={nationality} name="nationality" />
                </FieldGroup>
                <FieldGroup inline>
                    <FormTextField field={birthPlace} name="birth_place" />
                    <FormTextField field={birthDate} name="birth_date" />
                </FieldGroup>
                <h4>Contact</h4>
                <FieldGroup>
                    <FormTextField field={phone} name="phone" />
                    <FormTextField field={addressLine1} name="address_line_1" />
                    <FormTextField field={addressLine2} name="address_line_2" />
                    <FormTextField field={addressLine3} name="address_line_3" />
                    <FormTextField field={addressLine4} name="address_line_4" />
                </FieldGroup>
                <FieldGroup>
                    {footer ? footer(submitHandle) : this.footer(submitting)}
                </FieldGroup>
            </form>
        );
    }
}

export const PersonalCreateFormWithData = graphql<PersonalCreateMutation, PersonalCreateFormProps>(gql`
mutation PersonalCreate($input: PersonalCreateInput!) {
    PersonalCreate(input: $input) {
        viewer {
            id
            user {
                id
                personal {
                    id
                }
            }
        }
        
        personal {
            id
        }
    }
}
`)(PersonalCreateForm);
