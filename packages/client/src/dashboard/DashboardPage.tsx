import * as React from 'react';

import { DashboardWithData } from './Dashboard';
import { UserLogoutButton } from '../user/UserLogoutButton';

export interface DashboardPageState { }
export interface DashboardPageProps { }

export class DashboardPage extends React.PureComponent<DashboardPageProps, DashboardPageState> {
  render() {
    return (
      <div className="dashboard-page">
        <div className="dashboard-page__header">
          <p>Hello user!</p>
          <UserLogoutButton />
        </div>
        <DashboardWithData />
      </div>
    );
  }
}
