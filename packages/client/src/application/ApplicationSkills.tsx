import './application-skills.css';

import * as React from 'react';

import { ApplicationSectionLabel } from './ApplicationSectionLabel';

export interface SkillGroup {
    id: string;
    title: string;
}

export interface Skill {
    id: string;
    description: string;
    group: SkillGroup;
}

export interface ApplicationSkillGroupProps {
    title: string;
    skills: Skill[];
}

export class ApplicationSkillGroup extends React.PureComponent<ApplicationSkillGroupProps> {
    render() {
        const { title, skills } = this.props;
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

export interface ApplicationSkillsProps {
    skills: Skill[];
}

export class ApplicationSkills extends React.PureComponent<ApplicationSkillsProps>  {
    render() {
        const skillGroups: { [index: string]: Skill[] } = this.props.skills.reduce(
            (groups, skill) => ({ ...groups, [skill.group.title]: [...(groups[skill.group.title] || []), skill] }),
            {}
        );
        return (
            <div className="skills application-segment-appear">
                <ApplicationSectionLabel>Skills</ApplicationSectionLabel>
                <div className="skills-items">{
                    Object.keys(skillGroups).map(group =>
                        <ApplicationSkillGroup title={group} skills={skillGroups[group]} key={group} />
                    )
                }</div>
            </div>
        );
    }
}
