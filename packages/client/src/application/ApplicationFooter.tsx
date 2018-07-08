import './application-footer.css';

import * as React from 'react';

export interface ApplicationFooterState {}
export interface ApplicationFooterProps {}

// tslint:disable-next-line:max-line-length
export class ApplicationFooter extends React.Component<ApplicationFooterProps, ApplicationFooterState> {
  render() {
    const url = window.location.origin + window.location.pathname;
    return (
        <div className="application-footer">
            <p>
                This CV has been created using reactjs powered by a graphql backend. 
                See it live at <a href={url}>{url}</a>.
            </p>
        </div>
    );
  }
}
