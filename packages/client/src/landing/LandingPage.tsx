import * as React from 'react';

import { Link } from 'react-router-dom';

export interface LandingPageState {}
export interface LandingPageProps {}

export class LandingPage extends React.Component<LandingPageProps, LandingPageState> {
  render() {
    return (
        <div className="landing-page">
            <h1>Hi there!</h1>
            <Link to="/application/test">See my CV!</Link>
        </div>
    );
  }
}
