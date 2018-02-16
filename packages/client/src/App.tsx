import * as React from 'react';

import { AuthProvider } from './user/AuthProvider';
import { DashboardPage } from './dashboard/DashboardPage';
import { WelcomePage } from './welcome/WelcomePage';

export class App extends React.PureComponent {
  render() {
    return (
      <div className="App">
        <AuthProvider>{authenticated => authenticated
          ? <DashboardPage />
          : <WelcomePage />
        }</AuthProvider>
      </div>
    );
  }
}
