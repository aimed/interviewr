import * as React from 'react';

import { classnames } from '@hydrokit/utils';

export const FieldGroup: React.StatelessComponent<{ inline?: boolean }> = (props) => {
    const className = classnames(
        'hk-field-group',
        props.inline && 'hk-field-group--inline'
    );
    return (
        <div className={className}>{props.children}</div>
    );
};