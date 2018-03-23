import './nav.css';

import * as React from 'react';

import { AuthProvider } from '../user/AuthProvider';
import { UserLogoutButton } from '../user/UserLogoutButton';

export interface NavigationProps {}

export const Navigation: React.StatelessComponent<NavigationProps> = props => (
    <AuthProvider>{authenticated => {
        return (
            <nav className="nav">
                <div className="nav__primary">Interviewr</div>
                <div className="nav__secondary"><UserLogoutButton /> </div>
            </nav>
        );
    }}</AuthProvider>
);