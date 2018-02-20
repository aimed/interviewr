import * as React from 'react';

import { Timeline, TimelineItem } from '../timeline/Timeline';

import { ApplicationSectionLabel } from './ApplicationSectionLabel';

export interface WorkExperience {
    id: string;
    role: string;
    employer: string;
    description: string;
    startDate: Date;
    endDate?: Date;
}

const workToTimelineItem: (work: WorkExperience) => TimelineItem = 
    ({ role, employer, description, ...rest }) => 
        ({ title: role, text: description, secondaryTitle: employer, ...rest });

export interface ApplicationWorkExperienceProps {
    work: WorkExperience[];
}

export const ApplicationWorkExperience: React.StatelessComponent<ApplicationWorkExperienceProps> = props => {
    const timeline = props.work.map(workToTimelineItem);
    return (
        <div className="work-experience">
            <ApplicationSectionLabel>Work experience</ApplicationSectionLabel>
            <Timeline timeline={timeline} />
        </div>
    );
};
