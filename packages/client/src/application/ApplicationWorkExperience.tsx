import './application-work-experience.css';

import * as React from 'react';

import { ApplicationSectionLabel } from './ApplicationSectionLabel';
import { Period } from './Period';

export interface WorkExperience {
    id: string;
    role: string;
    employer: string;
    description: string;
    startDate: Date;
    endDate?: Date;
}

export interface WorkExperienceItemProps {
    work: WorkExperience;
}

export const WorkExperienceItem: React.StatelessComponent<WorkExperienceItemProps> = props => {
    const {
        role,
        employer,
        description,
        startDate,
        endDate
    } = props.work;
    return (
        <div className="work-experience-item">
            <div className="work-experience-item__meta">
                <div className="work-experience-item__role">{role}</div>
                <div className="work-experience-item__employer">{employer}</div>
                <Period startDate={startDate} endDate={endDate} />
            </div>
            <div className="work-experience-item__description">{description}</div>
        </div>
    );
};

export interface ApplicationWorkExperienceProps {
    work: WorkExperience[];
}

export const ApplicationWorkExperience: React.StatelessComponent<ApplicationWorkExperienceProps> = props => {
    return (
        <div className="work-experience">
            <ApplicationSectionLabel>Work experience</ApplicationSectionLabel>
            <div className="work-experience__items">
            {props.work.map(work => 
                <WorkExperienceItem work={work} key={work.id} />
            )}
            </div>
        </div>
    );
};
