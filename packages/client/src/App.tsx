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

// tslint:disable-next-line:max-line-length
// <a href="//www.iubenda.com/privacy-policy/65934446" class="iubenda-white iubenda-embed" title="Privacy Policy">Privacy Policy</a><script type="text/javascript">(function (w,d) {var loader = function () {var s = d.createElement("script"), tag = d.getElementsByTagName("script")[0]; s.src = "//cdn.iubenda.com/iubenda.js"; tag.parentNode.insertBefore(s,tag);}; if(w.addEventListener){w.addEventListener("load", loader, false);}else if(w.attachEvent){w.attachEvent("onload", loader);}else{w.onload = loader;}})(window, document);</script>
