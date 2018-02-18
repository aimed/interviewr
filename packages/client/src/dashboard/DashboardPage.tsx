import * as React from 'react';

import { ApplicationPage } from '../application/ApplicationPage';
import { DashboardWithData } from './Dashboard';
import { UserLogoutButton } from '../user/UserLogoutButton';

export interface DashboardPageState { }
export interface DashboardPageProps { }

export class DashboardPage extends React.PureComponent<DashboardPageProps, DashboardPageState> {
  render() {
    return (
      <div className="dashboard-page">
        <DashboardWithData />
        <ApplicationPage />
        <div className="dashboard-page__header">
          <span>Hello user!</span>
          <UserLogoutButton />
        </div>
      </div>
    );
  }
}
