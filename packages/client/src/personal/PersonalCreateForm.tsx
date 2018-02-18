import * as React from 'react';

import { ChildProps, MutationOpts, graphql } from 'react-apollo';
// tslint:disable-next-line:max-line-length
import { PersonalCreateInput, PersonalCreateMutation, PersonalCreateMutationVariables } from '../operation-result-types';

import { Button } from '@hydrokit/button';
import { FormField } from '@hydrokit/formfield';
import { FormTextField } from '../common/HydrokitFormConnector';
import { MobxForm } from '../common/MobxForm';
import gql from 'graphql-tag';

const FieldGroup: React.StatelessComponent<{ inline?: boolean }> = (props) => {
    const inlineStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'row'
    };
    return (
        <div style={props.inline ? inlineStyle : {}}>{props.children}</div>
    );
};

export interface PersonalCreateFormState { }
export interface PersonalCreateFormProps extends ChildProps<{}, PersonalCreateMutation> {
    header?: JSX.Element;
    footer?: (submit: () => void) => JSX.Element;
    // tslint:disable-next-line:no-any
    onSubmit?: (input: PersonalCreateInput) => any;
}

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
            // tslint:disable-next-line:no-console
            console.info(result);
        } catch (error) {
            console.warn(error);
        }
    }

    footer(submitting: boolean) {
        return <Button>{submitting ? 'Submitting...' : 'Submit'}</Button>;
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
                <FieldGroup inline>
                    <FormTextField field={firstName} />
                    <FormTextField field={lastName} />
                </FieldGroup>
                <FieldGroup>
                    <FormTextField field={martialStatus} />
                    <FormTextField field={numberOfChildren} />
                </FieldGroup>
                <FormTextField field={nationality} />
                <FieldGroup inline>
                    <FormTextField field={birthPlace} />
                    <FormTextField field={birthDate} />
                </FieldGroup>
                <FieldGroup>
                    <FormTextField field={phone} />
                    <FormTextField field={addressLine1} />
                    <FormTextField field={addressLine2} />
                    <FormTextField field={addressLine3} />
                    <FormTextField field={addressLine4} />
                </FieldGroup>
                <FormField>
                    {footer ? footer(submitHandle) : this.footer(submitting)}
                </FormField>
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
