import { ExecutionResult, MutationFn } from 'react-apollo';

export interface MutationFormProps<TMutation> {
    // tslint:disable-next-line:no-any
    onResult: (result: ExecutionResult<TMutation> | void) => any;
    // tslint:disable-next-line:no-any
    onError: (error: Error) => any;
}

export interface MutationFormChildProps<TMutation, TVariables> extends MutationFormProps<TMutation> {
    mutate: MutationFn<TMutation, TVariables>;
}
