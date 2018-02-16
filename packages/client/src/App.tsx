import * as React from 'react';

import { Redirect, Route } from 'react-router';

import { AuthenticatedRoute } from './user/AuthenticatedRoute';
import { BrowserRouter } from 'react-router-dom';
import { DashboardPage } from './dashboard/DashboardPage';
import { WelcomePage } from './welcome/WelcomePage';

export class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/" component={WelcomePage} />
          <AuthenticatedRoute exact path="/" render={() => <Redirect to="/dashboard" />} />
          <AuthenticatedRoute exact path="/dashboard" component={DashboardPage} />
        </div>
      </BrowserRouter>
    );
  }
}
