import * as React from 'react';

import {
    ApplicationWorkExperienceApplicationFragment,
    ApplicationWorkExperienceWorkFragment
} from '../operation-result-types';
import { Timeline, TimelineItem } from '../timeline/Timeline';

import { ApplicationSectionLabel } from './ApplicationSectionLabel';
import gql from 'graphql-tag';

const workToTimelineItem: (work: ApplicationWorkExperienceWorkFragment) => TimelineItem =
    ({ role, employer, description, id, startDate, endDate }) =>
        ({
            id,
            title: role,
            text: description,
            secondaryTitle: employer,
            startDate: new Date(startDate),
            endDate: endDate ? new Date(endDate) : null
        });

export interface ApplicationWorkExperienceProps {
    data: ApplicationWorkExperienceApplicationFragment;
}

export class ApplicationWorkExperience extends React.PureComponent<ApplicationWorkExperienceProps> {
    static fragments = {
        application: gql`
        fragment ApplicationWorkExperienceApplication on Application {
            color
            work {
                ...ApplicationWorkExperienceWork
            }
        }
        fragment ApplicationWorkExperienceWork on Work {
            id
            employer
            role
            description
            startDate
            endDate
        }        
        `,
    };
    render() {
        const timeline = this.props.data.work.map(workToTimelineItem);
        return (
            <div className="work-experience application-segment-appear">
                <ApplicationSectionLabel>Work experience</ApplicationSectionLabel>
                <Timeline timeline={timeline} color={this.props.data.color} />
            </div>
        );
    }
}
