import './application-section-label.css';

import * as React from 'react';

export interface ApplicationSectionLabelProps {
    icon?: JSX.Element;
}

export const ApplicationSectionLabel: React.StatelessComponent<ApplicationSectionLabelProps> = props => {
    return (
        <h3 className="application-section-label">
            {props.icon && <span className="application-section-label__icon">{props.icon}</span>}
            <span className="application-section-label__text">
                {props.children}
            </span>
        </h3>
    );
};
