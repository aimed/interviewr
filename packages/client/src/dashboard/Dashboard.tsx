// import * as React from 'react';

// import { Query, QueryResult } from 'react-apollo';

// import { DashboardQuery } from '../operation-result-types';
// import gql from 'graphql-tag';

// export interface DashboardState { }
// export interface DashboardProps {
//     data: DashboardQuery;
// }

// export class Dashboard extends React.PureComponent<DashboardProps, DashboardState> {
//     render() {
//         if (!(this.props.data.viewer && this.props.data.viewer.user)) {
//             return null;
//         }
        
//         return (
//             <div className="dashboard">
//                 <div className="dashboard__applications">
//                     <div className="shashboard__applications__placeholder">
//                         You have not created any applications yet.
//                     </div>
//                 {this.props.data.viewer.user.applications.map(application => 
//                     application && <div key={application.id}>{application.id}</div>
//                 )}
//                 </div>
//             </div>
//         );
//     }
// }

// const QUERY = gql`
// query Dashboard {
//     viewer {
//         id
//         user {
//             id
//             applications {
//                 id
//             }
//         }
//     }
// }
// `;

// export const DashboardWithData = () => (
//     <Query query={QUERY}>{({ data }: QueryResult<DashboardQuery>) => {
//         if (!data) {
//             return null;
//         }

//         return (
//             <Dashboard data={data} />
//         );
//     }}</Query>
// );
