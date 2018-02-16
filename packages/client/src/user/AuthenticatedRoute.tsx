import * as React from 'react';

import { Redirect, Route, RouteProps } from 'react-router-dom';

import { AuthProvider } from './AuthProvider';

export const AuthenticatedRoute = (props: RouteProps & { redirectTo?: string; }) => {
    const { redirectTo = '/', path, component, render, ...route } = props;
    return (
        <Route
            {...route}
            path={path}
            render={routeProps => {
                const Component = component;
                return (
                    <AuthProvider>{authenticated => {
                        if (authenticated && Component) {
                            return <Component />;
                        }

                        if (authenticated && render) {
                            return render(routeProps);
                        }

                        if (redirectTo !== routeProps.location.pathname) {
                            return <Redirect to={redirectTo} />;
                        }

                        return null;
                    }}</AuthProvider>
                );
            }}
        />
    );
};
