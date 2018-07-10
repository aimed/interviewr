import './period.css';

import * as React from 'react';

/**
 * Outputs a localized year/month representation of the date or an empty string if falsy
 * @param date The date to format
 */
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

/**
 * Renders a time interval/a period in time. e.g. 09/2000 - 10/2001
 */
export const Period: React.StatelessComponent<Period> = props => {
    const { startDate, endDate } = props;
    return (
        <div className="period">{`${formatDate(startDate)} - ${formatDate(endDate)}`}</div>
    );
};
