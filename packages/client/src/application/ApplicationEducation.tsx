import * as React from 'react';

import { Timeline, TimelineItem } from '../timeline/Timeline';

import { ApplicationSectionLabel } from './ApplicationSectionLabel';

export interface Education {
    id: string;
    degree: string;
    institution: string;
    description: string;
    startDate: Date;
    endDate?: Date;
}

const educationToTimelineItem: (education: Education) => TimelineItem =
    ({ degree, institution, description, ...rest }) =>
        ({ title: degree, secondaryTitle: institution, text: description, ...rest });

export interface ApplicationEducationProps {
    education: Education[];
}

export const ApplicationEducation: React.StatelessComponent<ApplicationEducationProps> = props => {
    return (
        <div className="education">
            <ApplicationSectionLabel>Education</ApplicationSectionLabel>
            <Timeline timeline={props.education.map(educationToTimelineItem)} />
        </div>
    );
};
