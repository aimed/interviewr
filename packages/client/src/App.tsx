import './App.css';

import * as React from 'react';

import { HelloWorld } from './HelloWorld';

export class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HelloWorld />
      </div>
    );
  }
}
