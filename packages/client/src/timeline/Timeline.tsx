import './Timeline.css';

import * as React from 'react';

import { Period } from '../application/Period';

export interface TimelineItem {
    id: string;
    title: string;
    secondaryTitle?: string;
    text: string | JSX.Element;
    startDate: Date;
    endDate?: Date;
}

const compareTimelineItems = (a: TimelineItem, b: TimelineItem) => {
    if (a.startDate === b.startDate) {
        return 0;
    }
    return a.startDate < b.startDate ? 1 : -1;
};

export interface TimelineProps {
    timeline: TimelineItem[];
}

export const Timeline: React.StatelessComponent<TimelineProps> = props => {
    const timeline = props.timeline.sort(compareTimelineItems);
    return (
        <div className="timeline">
            {timeline.map(item =>
                <div className="timeline__item" key={item.id}>
                    <div className="timeline__time"><Period startDate={item.startDate} endDate={item.endDate} /> </div>
                    <div className="timeline__body">
                        <div className="timeline__title">
                            <div className="timeline__title__primary">{item.title}</div>
                            {item.secondaryTitle && 
                                <div className="timeline__title__secondary">{item.secondaryTitle}</div>}
                        </div>
                        <div className="timeline__text">{item.text}</div>
                    </div>
                </div>
            )}
        </div>
    );
};
