import './application-page.css';

import * as React from 'react';

import { ApplicationEducation, Education } from './ApplicationEducation';
import { ApplicationSkills, Skill, SkillGroup } from './ApplicationSkills';
import { ApplicationWorkExperience, WorkExperience } from './ApplicationWorkExperience';
import { RouteComponentProps, withRouter } from 'react-router';

import { ApplicationPageQuery } from '../operation-result-types';
import { ApplicationPersonal } from './ApplicationPersonal';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// tslint:disable:max-line-length
const gravatar = 'https://en.gravatar.com/userimage/24124275/acf9df1a3eb03a58a263aed5c1bff778.jpg?size=200';
const work: WorkExperience[] = [{
    id: '1',
    employer: 'FLW TU Dortmund',
    role: 'Assistant Student',
    description: 'Responsible for developing a material flow simulation library. Experience in C#, distributed algorithms, Unit Testing, material flow control.',
    startDate: new Date(2016, 11, 1)
}];

const education: Education[] = [{
    id: '1',
    institution: 'TU Dortmund',
    degree: 'B.Sc. Logistics',
    description: 'Focus on facility logistics. The program includes a wide range of classes related to math, programming and project management.',
    startDate: new Date(2009, 8, 1),
    endDate: new Date(2016, 8, 1)
}, {
    id: '2',
    institution: 'TU Dortmund',
    degree: 'B.Sc. Computer Science',
    description: 'Computer Science degree with classes on web development and formal system verification.',
    startDate: new Date(20013, 8, 1),
    endDate: new Date(2018, 5, 1)
}];

const programmingGroup: SkillGroup = {
    id: '1',
    title: 'Programming languages and Frameworks'
};

const skills: Skill[] = [{
    id: '1',
    description: '> 20 years eagerness to learn',
    group: programmingGroup
}, {
    id: '2',
    description: 'React',
    group: programmingGroup
}];

export interface ApplicationPageProps { }

export const ApplicationPage: React.StatelessComponent<ApplicationPageProps> = props => {
    return (
        <div className="application-page">
            <ApplicationPersonal
                firstName="Maximilian"
                lastName="Täschner"
                profileImageUrl={gravatar}
            />
            <ApplicationWorkExperience
                work={work}
            />
            <ApplicationEducation
                education={education}
            />
            <ApplicationSkills
                skills={skills}
            />
        </div>
    );
};

interface RouteParams {
    accessCode: string;
}

export const ApplicationPageWithData = withRouter(graphql<ApplicationPageQuery, ApplicationPageProps & RouteComponentProps<RouteParams>>(gql`
    query ApplicationPage($accessCode: String!) {
        application(accessCode: $accessCode) {
            id
        }
    }
    `, 
    // tslint:disable-next-line:align
    { 
        options: (route: RouteComponentProps<RouteParams>) => {            
            return { 
                variables: { 
                    accessCode: route.match.params.accessCode 
                } 
            };
        }
    }
)(ApplicationPage));
