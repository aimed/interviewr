import './application-education.css';

import * as React from 'react';

import { ApplicationSectionLabel } from './ApplicationSectionLabel';
import { Period } from './Period';

export interface Education {
    id: string;
    degree: string;
    institution: string;
    description: string;
    startDate: Date;
    endDate?: Date;
}

export interface ApplicationEducationItemProps {
    education: Education;
}

export const ApplicationEducationItem: React.StatelessComponent<ApplicationEducationItemProps> = props => {
    const {
        degree,
        institution,
        description,
        startDate,
        endDate
    } = props.education;
    return (
        <div className="education-item">
        <div className="education-item__meta">
            <div className="education-item__degree">{degree}</div>
            <div className="education-item__institution">{institution}</div>
            <Period startDate={startDate} endDate={endDate} />
        </div>
        <div className="education-item__description">{description}</div>
    </div>
    );
};

export interface ApplicationEducationProps {
    education: Education[];
}

export const ApplicationEducation: React.StatelessComponent<ApplicationEducationProps> = props => {
    return (
        <div className="education">
            <ApplicationSectionLabel>Education</ApplicationSectionLabel>
            <div className="education__items">{props.education.map(education => 
                <ApplicationEducationItem education={education} key={education.id} />
            )}</div>
        </div>
    );
};
