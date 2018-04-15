import * as React from 'react';

import { Redirect, Route, Switch } from 'react-router';

import { ApplicationPageWithData } from './application/ApplicationPage';
// import { AuthenticatedRoute } from './user/AuthenticatedRoute';
import { BrowserRouter } from 'react-router-dom';
import { LandingPage } from './landing/LandingPage';

// import { DashboardPage } from './dashboard/DashboardPage';
// import { WelcomePage } from './welcome/WelcomePage';

export class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            {/* <AuthenticatedRoute exact path="/dashboard" component={DashboardPage} /> */}
            <Route path="/application/:accessCode" component={ApplicationPageWithData} />
            {/* <Route exact path="/" component={WelcomePage} /> */}
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
