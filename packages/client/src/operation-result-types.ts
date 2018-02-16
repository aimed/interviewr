/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface UserCreateInput {
  password: string,
  email: string,
  clientMutationId?: string | null,
};

export interface HelloWorldQuery {
  hello: string | null,
};

export interface UserCreateMutationVariables {
  input: UserCreateInput,
};

export interface UserCreateMutation {
  UserCreate:  {
    token: string,
    viewer:  {
      user:  {
        id: string,
        email: string,
      } | null,
    } | null,
  } | null,
};
