import './application-skills.css';

import * as React from 'react';

import {
    ApplicationSkillGroupSkillGroupFragment,
    ApplicationSkillGroupsApplicationFragment
} from 'operation-result-types';

import { ApplicationSectionLabel } from './ApplicationSectionLabel';
import gql from '../../node_modules/graphql-tag';

export interface ApplicationSkillGroupProps {
    data: ApplicationSkillGroupSkillGroupFragment;
}

export class ApplicationSkillGroup extends React.PureComponent<ApplicationSkillGroupProps> {
    public static fragments = {
        skillGroup: gql`
            fragment ApplicationSkillGroupSkillGroup on SkillGroup {
                id
                title
                skills {
                    id
                    description
                }
            }
        `
    };
    render() {
        const { title, skills } = this.props.data;
        return (
            <div className="skill-group">
                <div className="skill-group__title">{title}</div>
                <ul className="skill-group__skills">{
                    skills.map(skill =>
                        <li className="skill" key={skill.id}>
                            <div className="skill__description">{skill.description}</div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export interface ApplicationSkillGroupsProps {
    data: ApplicationSkillGroupsApplicationFragment;
}

export class ApplicationSkillGroups extends React.PureComponent<ApplicationSkillGroupsProps> {
    public static fragments = {
        application: gql`
            fragment ApplicationSkillGroupsApplication on Application {
                skillGroups {
                    ...ApplicationSkillGroupSkillGroup
                }
            }
            ${ApplicationSkillGroup.fragments.skillGroup}
        `
    };

    render() {
        return (
            <div className="skills application-segment-appear">
                <ApplicationSectionLabel>Skills</ApplicationSectionLabel>
                <div className="skills-items">{
                    this.props.data.skillGroups.map(skillGroup => 
                        <ApplicationSkillGroup key={skillGroup.id} data={skillGroup} />
                    )
                }</div>
            </div>
        );
    }
}
