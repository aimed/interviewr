import { action, computed, observable } from 'mobx';

/** 
 * 
 */
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
    /**
     * An optional label for the field.
     * 
     * @type {string}
     * @memberof FieldDefinition
     */
    label?: string;
    /**
     * A list of validators..
     * 
     * @type {Validator<T, F>[]}
     * @memberof FieldDefinition
     */
    validators?: Validator<T, F>[];
    /**
     * The default value.
     * 
     * @type {(T | null)}
     * @memberof FieldDefinition
     */
    defaultValue: T | null;
    /**
     * The initial value. This overrides the default value when set.
     * 
     * @type {T}
     * @memberof FieldDefinition
     */
    initialValue?: T;
    /**
     * A function that will be executed before submit. This can be used to 
     * sanitize data.
     * 
     * @memberof FieldDefinition
     */
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

    /**
     * Gets the current value on the field. This considers initial and default 
     * values.
     * 
     * @readonly
     * @type {T}
     * @memberof Field
     */
    @computed
    get value(): T {
        return this._value !== undefined ? this._value : (this.initialValue || this.defaultValue);
    }

    /**
     * A field is valid if it has no errors.
     * 
     * @readonly
     * @type {boolean}
     * @memberof Field
     */
    @computed
    get valid(): boolean {
        return !!this.errors;
    }

    /**
     * Gets the value as returned by the pre submit function.
     * This value will be used when the submit handler is triggered and for validation.
     * 
     * @readonly
     * @type {T}
     * @memberof Field
     */
    @computed
    get submitValue(): T {
        return this.transformPreSubmit ? this.transformPreSubmit(this.value) : this.value;
    }

    /**
     * Sets the value. 
     * This will trigger validation and mark the field dirty if the value has changed.
     * 
     * @memberof Field
     */
    set value(value: T) {
        this._value = value;
        this.dirty = this.initialValue && this.initialValue !== value || this.defaultValue !== value;
        this.validate();
    }

    /**
     * Mark the field as blurred.
     * This triggers validation.
     * 
     * @memberof Field
     */
    public blur() {
        this.touched = true;
        this.validate();
    }

    /**
     * A utility function to more easily bind this to react elements.
     * The same as blur.
     * 
     * @memberof Field
     */
    public onBlur = () => {
        this.blur();
    }

    /**
     * Creates an instance of Field.
     * @param {FieldDefinition<T, F>} definition 
     * @memberof Field
     */
    constructor(definition: FieldDefinition<T, F>) {
        // Assign all definition values.
        Object.keys(definition).forEach(k => this[k] = definition[k]);
        this.validate();
    }

    /**
     * Validates the field by passeing the submitvalue to all validators.
     * 
     * @private
     * @memberof Field
     */
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
 * @template TFields A set of keys with their types.
 */
export class MobxForm<TFields extends {}> {
    /**
     * When using the submit handler, this will be true while the handler
     * returned promise is not completed.
     * 
     * @type {boolean}
     * @memberof MobxForm
     */
    @observable
    public submitting: boolean = false;

    /**
     * The form is considered valid if all fields are valid.
     * 
     * @readonly
     * @type {boolean}
     * @memberof MobxForm
     */
    @computed
    public get isValid(): boolean {
        return Object.keys(this.fields).map(
            (key: keyof TFields) => {
                this.fields[key].blur();
                return this.fields[key].errors;
            }
        ).filter(v => v !== undefined).length === 0;
    }

    /**
     * Rreturns an object containing all submitvalues of the fields.
     * 
     * @readonly
     * @type {TFields}
     * @memberof MobxForm
     */
    @computed
    public get values(): TFields {
        // Check if any of the fields had validation errors.
        // Also blur the fields, to show error messages.
        const values: Partial<TFields> = {};
        Object.keys(this.fields).forEach((field: keyof TFields) => {
            values[field] = this.fields[field].submitValue;
        });
        return values as TFields;
    }

    /**
     * All fields in the form.
     * 
     * @type {{[V in keyof TFields]: Field<TFields[V], TFields> }}
     * @memberof MobxForm
     */
    @observable
    public fields: {[V in keyof TFields]: Field<TFields[V], TFields> };

    /**
     * Creates an instance of MobxForm.
     * @param {{[P in keyof TFields]: FieldDefinition<TFields[P], TFields> }} fieldDefinitions 
     * @memberof MobxForm
     */
    constructor(fieldDefinitions: {[P in keyof TFields]: FieldDefinition<TFields[P], TFields> }) {
        const fields: Partial<{[P in keyof TFields]: Field<TFields[P], TFields> }> = {};
        // Create fields based on the config.
        Object.keys(fieldDefinitions).forEach((field: keyof TFields) => {
            fields[field] = new Field(fieldDefinitions[field]);
        });
        this.fields = fields as {[P in keyof TFields]: Field<TFields[P], TFields> };
    }

    /**
     * Updates the default values of the form.
     * This can be used, for exmaple, after a form has been submitted and 
     * a new default value should be shown.
     * 
     * @param {(Partial<TFields> | null | undefined)} values An object contaning the new default values.
     * @returns void
     * @memberof MobxForm
     */
    @action
    public updateDefaultValues(values: Partial<TFields> | null | undefined) {
        if (!values) {
            return;
        }

        Object.keys(values).forEach(
            (key: keyof TFields) => this.fields[key].defaultValue = values[key] as TFields[keyof TFields]);
    }

    /**
     * Resets a form by assigning the default value to all fields.
     * 
     * @memberof MobxForm
     */
    @action
    public reset() {
        Object.keys(this.fields).forEach(
            (key: keyof TFields) => this.fields[key].value = this.fields[key].defaultValue
        );
    }

    /**
     * Create a React form submit handler.
     * The handler will execute the submit callback and prevent the form event.
     * The form will only be submittet, if it is not submitting and has no 
     * errors.
     * 
     * @param {(TFields => Promise<R>)} submit The callback that will be executed 
     *                                   if the returned handler is called.
     * @returns Handler.
     * @memberof MobxForm
     */
    public submit = <R>(submit: (values: TFields) => Promise<R> | void) => {
        return async (event?: React.FormEvent<HTMLFormElement>) => {
            if (event) {
                event.preventDefault();
            }

            if (this.submitting) {
                return;
            }

            const hasErrors = !this.isValid;

            // If there were any errors or the field is already submitting.
            if (hasErrors) {
                return;
            }

            this.submitting = true;
            try {
                await submit(this.values);
            } catch (error) {
                console.warn('MobxForm submitted a form with an unhandled error: ', error);
            } finally {
                this.submitting = false;
            }
        };
    }
}
