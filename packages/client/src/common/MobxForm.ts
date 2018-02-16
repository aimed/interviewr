import { action, computed, observable } from 'mobx';

export type Validator<T, P extends object> = (value: T, form?: MobxForm<P>) => string | undefined;

/**
 * Properties to create a @see Field<T, F>.
 * 
 * @export
 * @interface FieldDefinition
 * @template T The type.
 * @template F The form.
 */
export interface FieldDefinition<T, F extends object> {
    label?: string;
    validators?: Validator<T, F>[]; 
    defaultValue: T | null;
    initialValue?: T;
    transformPreSubmit?: (value: T) => T;
}

/**
 * A field in the form.
 * 
 * @export
 * @class Field
 * @implements {FieldDefinition<T, F>}
 * @template T The type of the field.
 * @template F The type of the form.
 */
export class Field<T, F extends object> implements FieldDefinition<T, F> {
    public validators?: Validator<T, F>[];
    public initialValue?: T;
    public transformPreSubmit?: (value: T) => T;
    public label?: string;

    @observable public defaultValue: T;
    @observable public errors?: [string];
    @observable public touched?: boolean;
    @observable public dirty?: boolean;
    @observable private _value?: T;
    
    @computed
    get value(): T {
        return this._value !== undefined ? this._value : (this.initialValue || this.defaultValue);
    }

    @computed
    get valid(): boolean {
        return !!this.errors;
    }

    @computed
    get submitValue(): T {
        return this.transformPreSubmit ? this.transformPreSubmit(this.value) : this.value;
    }

    set value(value: T) {
        this._value = value;
        this.dirty = this.initialValue && this.initialValue !== value || this.defaultValue !== value;
        this.validate();
    }

    public blur() {
        this.touched = true;
        this.validate();
    }

    public onBlur = () => {
        this.blur();
    }

    constructor(definition: FieldDefinition<T, F>) {
        Object.keys(definition).forEach(k => this[k] = definition[k]);
        this.validate();
    }

    private validate() {
        if (this.validators) {
            const value = this.submitValue;
            const errors = 
            this.validators
            .map(validator => validator(value))
            .filter(v => v !== undefined) as [string];
            this.errors = errors.length > 0 ? errors : undefined;
        }
    }
}

/**
 * A set of values and handlers to manage forms.
 * 
 * @export
 * @class FormData
 * @template T A set of keys with their types.
 */
export class MobxForm<T extends object> {
    @observable
    public submitting: boolean = false;

    @computed
    public get isValid(): boolean {
        return true;
    }

    @computed
    public get values(): T {
        const values: Partial<T> = {};
        Object.keys(this.fields).forEach((field: keyof T) => {
            values[field] = this.fields[field].submitValue;
        });
        return values as T;
    }

    @observable
    public fields: { [V in keyof T]: Field<T[V], T> };
    
    constructor(fieldDefinitions: { [P in keyof T]: FieldDefinition<T[P], T> }) {
        const fields: Partial<{ [P in keyof T]: Field<T[P], T> }> = {};
        Object.keys(fieldDefinitions).forEach((field: keyof T) => {
            fields[field] = new Field(fieldDefinitions[field]);
        });
        this.fields = fields as { [P in keyof T]: Field<T[P], T> };
    }

    @action
    public updateDefaultValues(values: Partial<T>) {
        Object.keys(values).forEach((key: keyof T) => this.fields[key].defaultValue = values[key] as T[keyof T]);
    }

    @action
    public reset() {
        Object.keys(this.fields).forEach(
            (key: keyof T) => this.fields[key].value = this.fields[key].defaultValue
        );
    }

    public submit = <R>(submit: (values: T) => Promise<R> | void) => {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();

            if (this.submitting) {
                return;
            }

            // Check if any of the fields had validation errors.
            // Also blur the fields, to show error messages.
            const hasErrors = Object.keys(this.fields).map(
                (key: keyof T) => this.fields[key].blur() || this.fields[key].errors
            ).filter(v => v !== undefined).length > 0;
            
            // If there were any errors or the field is already submitting.
            if (hasErrors) {
                return;
            }

            this.submitting = true;
            try {
                await submit(this.values);           
            } catch (e) {
                console.warn('MobxForm submitted a form with an unhandled error: ', e);
            } finally {
                this.submitting = false;
            }
        };
    }
}
