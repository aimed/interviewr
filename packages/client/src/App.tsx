import * as React from 'react';

import { HelloWorld } from './HelloWorld';
import { UserCreateFormWithData } from './user/UserCreateForm';

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HelloWorld />
        <UserCreateFormWithData />
      </div>
    );
  }
}
