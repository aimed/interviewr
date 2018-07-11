import './application-footer.css';

import * as React from 'react';

import i18next from 'i18next';

export interface ApplicationFooterState {}
export interface ApplicationFooterProps {}

// tslint:disable-next-line:max-line-length
export class ApplicationFooter extends React.Component<ApplicationFooterProps, ApplicationFooterState> {
  render() {
    const url = window.location.origin + window.location.pathname;
    // tslint:disable-next-line:no-console
    return (
        <div className="application-footer">
            <p>{i18next.t('application:footer.weblink', { url })}</p>
        </div>
    );
  }
}
