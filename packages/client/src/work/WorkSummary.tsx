import * as React from 'react';

// import { WorkSummaryQuery } from '../operation-result-types';
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';

export interface WorkSummaryState { }
export interface WorkSummaryProps {
    workId: string;
}

export class WorkSummary extends React.Component<WorkSummaryProps, WorkSummaryState> {
    render() {
        return null;
    }
}

// export const WorkSummaryWithData = graphql<WorkSummaryQuery, WorkSummaryProps>(gql`
// query WorkSummary($id: ID!) {
//     node(id: $id) {
//         ... on Work {
//             role
//             employer
//         }
//     }
// }
// `,
//     // tslint:disable-next-line:align
//     {
//         options: (props) => ({ variables: { id: props.workId } })
//     })(WorkSummary);
