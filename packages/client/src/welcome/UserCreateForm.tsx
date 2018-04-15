// import * as React from 'react';

// import { ChildProps, MutationOpts, graphql } from 'react-apollo';
// import { UserCreateInput, UserCreateMutation, UserCreateMutationVariables } from '../operation-result-types';

// import { Button } from '@hydrokit/button';
// import { FormField } from '@hydrokit/formfield';
// import { FormTextField } from '../common/HydrokitFormConnector';
// import { MobxForm } from '../common/MobxForm';
// import gql from 'graphql-tag';
// import { observer } from 'mobx-react';

// export interface UserCreateFormState {}
// export interface UserCreateFormProps extends ChildProps<{}, UserCreateMutation> {
//     defaults?: Partial<UserCreateInput>;
//     header?: JSX.Element;
//     footer?: (submitHandle: (input: UserCreateInput) => void) => JSX.Element;
//     // tslint:disable-next-line:no-any
//     onSubmit?: (input: UserCreateInput) => any;
// }

// @observer
// export class UserCreateForm extends React.Component<UserCreateFormProps, UserCreateFormState> {
//     componentDidMount() {
//         this.form.updateDefaultValues(this.props.defaults);
//     }

//     form = new MobxForm<UserCreateInput>({
//         email: {
//             label: 'Email',
//             defaultValue: ''
//         },
//         password: {
//             label: 'Password',
//             defaultValue: ''
//         }
//     });

//     onSubmit = async (input: UserCreateInput) => {
//         if (!this.props.mutate) {
//             return;
//         }
//         const opts: MutationOpts<UserCreateMutationVariables> = { variables: { input } };
//         try {
//             const result = await this.props.mutate(opts);
//             // tslint:disable-next-line:no-console
//             console.info(result);
//         } catch (error) {
//             console.warn(error);
//         }
//     }

//     footer(submitting: boolean) {
//         return <Button primary={true}>{submitting ? 'Signing up...' : 'Sign up'}</Button>;
//     }

//     render() {
//         const { submit, submitting } = this.form;
//         const { email, password } = this.form.fields;
//         const { header, footer, onSubmit } = this.props;
//         const submitHandle = () => (onSubmit || this.onSubmit)(this.form.values);

//         return (
//             <form onSubmit={submit(onSubmit || this.onSubmit)}>
//                 {header}
//                 <FormTextField field={email} />
//                 <FormTextField field={password} type="password" />
//                 <FormField>
//                     {footer ? footer(submitHandle) : this.footer(submitting)}
//                 </FormField>
//             </form>
//         );
//     }
// }

// export const UserCreateFormWithData = graphql<UserCreateMutation, UserCreateFormProps>(gql`
// mutation UserCreate($input: UserCreateInput!) {
//     UserCreate(input: $input) {
//         token
//         viewer {
//             id
//             user {
//                 id
//             }
//         }
//     }
// }
// `)(UserCreateForm);
