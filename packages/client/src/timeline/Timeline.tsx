import './Timeline.css';

import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';

import { Period } from '../application/Period';

/* tslint:disable:max-line-length */

/**
 * Items displayed in the timeline.
 */
export interface TimelineItem {
    id: string;
    title: string;
    secondaryTitle?: string;
    text?: string | null;
    startDate: Date;
    endDate?: Date | null;
}

/**
 * Sorts two items by their start date.
 * @param a Item 1
 * @param b Item 2
 */
const compareTimelineItems = (a: TimelineItem, b: TimelineItem) => {
    if (a.startDate === b.startDate) {
        return 0;
    }
    return a.startDate < b.startDate ? 1 : -1;
};

export interface TimelineProps {
    timeline: TimelineItem[];
    color?: string;
}

export const Timeline: React.StatelessComponent<TimelineProps> = props => {
    const style = (props.color ? { '--line-color': props.color } : {}) as React.CSSProperties;
    const timeline = props.timeline.sort(compareTimelineItems);

    return (
        <div className="timeline" style={style}>
            {timeline.map(item =>
                <div className="timeline__item" key={item.id}>

                    <div className="timeline__time">
                        <Period startDate={item.startDate} endDate={item.endDate} />
                    </div>

                    <div className="timeline__title__primary">{item.title}</div>
                    {item.secondaryTitle && <div className="timeline__title__secondary">{item.secondaryTitle}</div>}

                    <div className="timeline__body">
                        {item.text && <ReactMarkdown className="timeline__text react-mark-down" source={item.text} />}
                    </div>
                </div>
            )}
        </div>
    );
};
