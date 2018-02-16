import * as React from 'react';

import { AuthProvider } from './user/AuthProvider';
import { HelloWorld } from './HelloWorld';
import { UserCreateFormWithData } from './user/UserCreateForm';

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HelloWorld />
        <AuthProvider>{authenticated => authenticated
          ? <span>Hello</span>
          : <UserCreateFormWithData />
        }</AuthProvider>
      </div>
    );
  }
}
