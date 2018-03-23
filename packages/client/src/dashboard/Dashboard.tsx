import * as React from 'react';

import { ChildProps, graphql } from 'react-apollo';

import { DashboardQuery } from '../operation-result-types';
import gql from 'graphql-tag';

export interface DashboardState { }
export interface DashboardProps { }

export class Dashboard extends React.PureComponent<ChildProps<DashboardProps, DashboardQuery>, DashboardState> {
    render() {
        if (!(this.props.data && this.props.data.viewer && this.props.data.viewer.user)) {
            return null;
        }
        return (
            <div className="dashboard">
                <div className="dashboard__applications">
                    <div className="shashboard__applications__placeholder">
                        You have not created any applications yet.
                    </div>
                {this.props.data.viewer.user.applications.map(application => 
                    application && <div key={application.id}>{application.id}</div>
                )}
                </div>
            </div>
        );
    }
}

export const DashboardWithData = graphql<DashboardQuery, DashboardProps>(gql`
query Dashboard {
    viewer {
        id
        user {
            id
            applications {
                id
            }
        }
    }
}
`)(Dashboard);
