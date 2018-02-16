import * as React from 'react';

import { UserCreateFormWithData } from '../user/UserCreateForm';
import { UserLoginFormWithData } from '../user/UserLoginForm';

export interface WelcomePageProps {}

export const WelcomePage: React.StatelessComponent<WelcomePageProps> = props => {
    return (
      <div className="welcome-page">
        <div className="welcome-page__sign-up"><UserCreateFormWithData /></div>
        <div className="welcome-page__sign-in"><UserLoginFormWithData /></div>
      </div>
    );
};
