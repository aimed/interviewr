import * as React from 'react';

import { Redirect, Route, Switch } from 'react-router';

import { ApplicationPageWithData } from './application/ApplicationPage';
import { BrowserRouter } from 'react-router-dom';
import { LandingPage } from './landing/LandingPage';

export class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/application/:accessCode" component={ApplicationPageWithData} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
