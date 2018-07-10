import './period.css';

import * as React from 'react';

function formatDate(date?: Date | null): string {
    if (!date) {
        return '';
    }
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'numeric' });
}

export interface Period {
    startDate: Date;
    endDate?: Date | null;
}

export const Period: React.StatelessComponent<Period> = props => {
    const { startDate, endDate } = props;
    return (
        <div className="period">{`${formatDate(startDate)} - ${formatDate(endDate)}`}</div>
    );
};
