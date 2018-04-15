import * as React from 'react';

import {
    ApplicationEducationApplicationFragment,
    ApplicationEducationEducationFragment
} from '../operation-result-types';
import { Timeline, TimelineItem } from '../timeline/Timeline';

import { ApplicationSectionLabel } from './ApplicationSectionLabel';
import gql from 'graphql-tag';

// tslint:disable-next-line:no-any
const educationToTimelineItem: (education: ApplicationEducationEducationFragment) => TimelineItem =
    ({ id, degree, institution, description, startDate, endDate }) =>
        ({ 
            id, 
            title: degree, 
            secondaryTitle: institution, 
            text: description, 
            startDate: new Date(startDate), 
            endDate: endDate ? new Date(endDate) : undefined });

export interface ApplicationEducationProps {
    data: ApplicationEducationApplicationFragment;
}

export class ApplicationEducation extends React.PureComponent<ApplicationEducationProps, {}> {
    static fragments = {
        application: gql`
        fragment ApplicationEducationApplication on Application {
            education {
                ...ApplicationEducationEducation
            }
        }
        `,
        education: gql`
        fragment ApplicationEducationEducation on Education {
            id
            institution
            degree
            description
            startDate
            endDate
        }
        `
    };
    render() {
        return (
            <div className="education application-segment-appear">
                <ApplicationSectionLabel>Education</ApplicationSectionLabel>
                <Timeline timeline={this.props.data.education.map(educationToTimelineItem)} />
            </div>
        );
    }   
}
