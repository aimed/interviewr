import './application-personal.css';

import * as React from 'react';

import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export interface PersonalDataGroupProps {
    name: string;
    title: string;
    value: string | JSX.Element;
}

export const PersonalDataItem: React.StatelessComponent<PersonalDataGroupProps> = group => {
    const {
        name,
        title,
        value
    } = group;

    const style: React.CSSProperties = {
        gridArea: name
    };

    return (
        <div className={`personal__item ${name}`} key={name} style={style}>
            <div className="personal__item-title">{title}</div>
            <div className="personal__item-value">{value}</div>
        </div>
    );
};

export interface ApplicationPersonalProps {
    profileImageUrl?: string | null;
    firstName: string | null;
    lastName: string | null;
}

export const ApplicationPersonal: React.StatelessComponent<ApplicationPersonalProps> = props => {
    const {
        profileImageUrl,
        firstName,
        lastName
    } = props;
    return (
        <div className="personal">
            <div className="personal__picture">
                <img src={profileImageUrl || ''} />
            </div>
            <div className="personal__data">
                <h1 className="personal__name">{firstName} {lastName}</h1>
                <div className="personal__items">
                    {/* tslint:disable:max-line-length */}
                    <PersonalDataItem name="birth-date-place" title="Geburtstag, Geburtsort" value={'02.02.1990, Hamm'} />
                    <PersonalDataItem name="nationality" title="Staatsangehörigkeit" value={'Deutsch'} />
                    <PersonalDataItem name="contact" title="Kontakt" value={'+49 1517 0810408 | maximilian.taeschner@gmail.com | https://norocketlab.net'} />
                    <PersonalDataItem name="address" title="Adresse" value={'Dasbecker Weg 88 | 59073 Hamm | Germany'} />
                    {/* tslint:enable:max-line-length */}
                </div>
            </div>
        </div>
    );
};

export const ApplicationPersonalWithData = graphql(gql`
query ApplicationPersonal {
    viewer {
        id
    }
}
`)(query => {
        return null;
    });
