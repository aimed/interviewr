// import * as React from 'react';

// import { Mutation, MutationFn } from 'react-apollo';
// import { MutationFormChildProps, MutationFormProps } from '../utils/hydrokit_graphql_utils';
// import {
//     PersonalCreateInput,
//     PersonalCreateMutation,
//     PersonalCreateMutationVariables
// } from '../operation-result-types';

// import { Button } from '@hydrokit/button';
// import { FieldGroup } from '../common/FieldGroup';
// import { FormTextField } from '../common/HydrokitFormConnector';
// import { MobxForm } from '../common/MobxForm';
// import gql from 'graphql-tag';
// import { observer } from 'mobx-react';

// export interface PersonalCreateFormState { }
// export interface PersonalCreateFormProps 
//     extends MutationFormChildProps<PersonalCreateMutation, PersonalCreateMutationVariables> {
//         header?: JSX.Element;
//         footer?: (submit: () => void) => JSX.Element;
// }

// @observer
// export class PersonalCreateForm extends React.Component<PersonalCreateFormProps, PersonalCreateFormState> {
//     form = new MobxForm<PersonalCreateInput>({
//         firstName: { defaultValue: '', label: 'First name' },
//         lastName: { defaultValue: '', label: 'Last name' },
//         nationality: { defaultValue: '', label: 'Nationality' },
//         birthPlace: { defaultValue: '', label: 'Birth place' },
//         birthDate: { defaultValue: null, label: 'Birth date' },
//         martialStatus: { defaultValue: '', label: 'Martial status' },
//         numberOfChildren: { defaultValue: '', label: 'Number of children (and age)' },
//         phone: { defaultValue: '', label: 'Phone' },
//         addressLine1: { defaultValue: '', label: 'Address line' },
//         addressLine2: { defaultValue: '', label: 'Address line' },
//         addressLine3: { defaultValue: '', label: 'Address line' },
//         addressLine4: { defaultValue: '', label: 'Address line' },
//     });

//     onSubmit = (input: PersonalCreateInput) => {
//         const opts = { variables: { input } };
//         return this.props.mutate(opts).then(this.props.onResult).catch(this.props.onError);
//     }

//     footer(submitting: boolean) {
//         return <Button primary>{submitting ? 'Submitting...' : 'Submit'}</Button>;
//     }

//     render() {
//         const { submit, submitting } = this.form;
         // tslint:disable-next-line:max-line-length
//         const { firstName, lastName, birthDate, birthPlace, nationality, numberOfChildren, martialStatus, phone, addressLine1, addressLine2, addressLine3, addressLine4 } = this.form.fields;
//         const { header, footer } = this.props;
//         const submitHandle = () => (this.onSubmit)(this.form.values);

//         return (
//             <form onSubmit={submit(this.onSubmit)}>
//                 {header}
//                 <h4>General</h4>
//                 <FieldGroup inline>
//                     <FormTextField field={firstName} name="first_name" />
//                     <FormTextField field={lastName} name="last_name" />
//                 </FieldGroup>
//                 <h4>Family</h4>
//                 <FieldGroup>
//                     <FormTextField field={martialStatus} />
//                     <FormTextField field={numberOfChildren} />
//                 </FieldGroup>
//                 <h4>Nationality</h4>
//                 <FieldGroup>
//                     <FormTextField field={nationality} name="nationality" />
//                 </FieldGroup>
//                 <FieldGroup inline>
//                     <FormTextField field={birthPlace} name="birth_place" />
//                     <FormTextField field={birthDate} name="birth_date" />
//                 </FieldGroup>
//                 <h4>Contact</h4>
//                 <FieldGroup>
//                     <FormTextField field={phone} name="phone" />
//                     <FormTextField field={addressLine1} name="address_line_1" />
//                     <FormTextField field={addressLine2} name="address_line_2" />
//                     <FormTextField field={addressLine3} name="address_line_3" />
//                     <FormTextField field={addressLine4} name="address_line_4" />
//                 </FieldGroup>
//                 <FieldGroup>
//                     {footer ? footer(submitHandle) : this.footer(submitting)}
//                 </FieldGroup>
//             </form>
//         );
//     }
// }

// const MUTATION = gql`
// mutation PersonalCreate($input: PersonalCreateInput!) {
//     PersonalCreate(input: $input) {
//         viewer {
//             id
//             user {
//                 id
//                 personal {
//                     id
//                 }
//             }
//         }
        
//         personal {
//             id
//         }
//     }
// }
// `;

// export const PersonalCreateFormWithData = (props: MutationFormProps<PersonalCreateMutation>) => (
//     <Mutation mutation={MUTATION}>
//     {(personalCreate: MutationFn<PersonalCreateMutation, PersonalCreateMutationVariables>) => {
//         return <PersonalCreateForm mutate={personalCreate} {...props} />;
//     }}
//     </Mutation>
// );
