import * as React from 'react';

import { HelloWorldQuery } from './operation-result-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const HelloWorld = graphql<HelloWorldQuery>(gql`
query HelloWorld {
    hello
}
`)(props => {
    if (!props.data) {
        return <div>Loading...</div>;
    }
    return <div>{props.data.hello}</div>;
});
