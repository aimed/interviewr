import './application-section-label.css';

import * as React from 'react';

export interface ApplicationSectionLabelProps {}

export const ApplicationSectionLabel: React.StatelessComponent<ApplicationSectionLabelProps> = props => {
    return (
        <h3 className="application-section-label">{props.children}</h3>
    );
};
