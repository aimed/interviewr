import './loader.css';

import * as React from 'react';

import { Loader, LoaderProps } from './Loader';

export interface LoaderScreenState {}
export interface LoaderScreenProps extends LoaderProps {}

export class LoaderScreen extends React.Component<LoaderScreenProps, LoaderScreenState> {
  render() {
    return (
        <div className="loader-screen">
            <Loader {...this.props} />
        </div>
    );
  }
}
