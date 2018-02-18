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
          <AuthenticatedRoute exact path="/" render={() => <Redirect to="/dashboard" />} />
          <AuthenticatedRoute exact path="/dashboard" component={DashboardPage} />
          <Route path="/onboarding" component={WelcomePage} />
          <Route exact path="/" component={WelcomePage} />
        </div>
      </BrowserRouter>
    );
  }
}
