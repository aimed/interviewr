import './application-footer.css';

import * as React from 'react';

export interface ApplicationFooterState {}
export interface ApplicationFooterProps {}

export class ApplicationFooter extends React.Component<ApplicationFooterProps, ApplicationFooterState> {
  render() {
    return (
        <div className="application-footer">
            {/* tslint:disable-next-line */}
            <p>
                This CV has been created using reactjs powered by a graphql backend.<br />
                You can experiment and query data here: <a>https://maxforhire.com/playground</a>.<br />
                The open source code is availiable at: <a>https://github.com/aimed/interviewr</a>.</p>
        </div>
    );
  }
}
