import * as React from 'react';

import { Field } from './MobxForm';
import { FormEventHandler } from 'react';
import { FormField } from '@hydrokit/formfield';
import { TextField } from '@hydrokit/textfield';
import { observer } from 'mobx-react';

export function formField<T, F extends object>(field: Field<T, F>) {
    const { label, errors } = field;
    return { label, error: errors ? errors.join(', ') : undefined };
}

export function textField<F extends object>(field: Field<string | null | undefined, F>) {
    const { value, onBlur } = field;
    const onChange: FormEventHandler<HTMLInputElement> = event => field.value = event.currentTarget.value;
    return { value: value || '', onBlur, onChange };
}

export const FormTextField = observer((props: { field: Field<string | null | undefined, {}>, type?: string }) => (
    <FormField {...formField(props.field)}>
        <TextField {...textField(props.field)} type={props.type} />
    </FormField>
));