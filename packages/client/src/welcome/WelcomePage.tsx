import './welcome-page.css';

import * as React from 'react';

import { PersonalCreateInput, UserCreateInput } from '../operation-result-types';

import { UserCreateFormWithData } from './UserCreateForm';
import { UserLoginFormWithData } from './UserLoginForm';

export interface WelcomePageProps { }
export interface WelcomePageState { }

export class WelcomePage extends React.Component<WelcomePageProps, WelcomePageState> {
  userCreateInput: UserCreateInput | null = null;
  personalCreateInput: PersonalCreateInput | null = null;

  render() {
    return (
      <div className="welcome-page">
        <div className="welcome-page__sign-in"><UserLoginFormWithData /></div>
        <div className="welcome-page__content">
          <UserCreateFormWithData
            header={
              <div style={{ textAlign: 'center' }}>
                <h3>Start making job applications painless</h3>
                <h2>Join Interviewr</h2>
              </div>}
          />
        </div>
      </div>
    );
  }
}