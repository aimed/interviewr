import './application-personal.css';

import * as React from 'react';

import { ApplicationPersonalPersonalFragment } from '../operation-result-types';
import gql from 'graphql-tag';

export interface PersonalDataItemProps {
    name: string;
    title: string;
    value: string | JSX.Element | null;
}

export const PersonalDataItem: React.StatelessComponent<PersonalDataItemProps> = group => {
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
    data: ApplicationPersonalPersonalFragment;
}

export class ApplicationPersonal extends React.PureComponent<ApplicationPersonalProps, {}> {
    static fragments = {
        personal: gql`
            fragment ApplicationPersonalPersonal on Personal {
                firstName
                lastName
                email
                phone
                nationality
                martialStatus
                birthDate
                birthPlace
                addressLine1
                addressLine2
                addressLine3
                addressLine4
                profileImageUrl
            }
        `
    };

    render() {
        const {
            firstName,
            lastName,
            birthPlace,
            birthDate,
            addressLine1,
            addressLine2,
            addressLine3,
            addressLine4,
            email,
            phone,
            nationality,
            profileImageUrl,
            martialStatus
        } = this.props.data;
        
        const dateFormatted = birthDate ? new Date(birthDate).toLocaleDateString() : '';
        const contact = [email, phone].join(' | ');
        const address = [addressLine1, addressLine2, addressLine3, addressLine4].filter(a => !!a).join(' | ');

        return (
            <div className="personal">
                <div className="personal__picture">
                    <img src={profileImageUrl || ''} />
                </div>
                <div className="personal__data">
                    <h1 className="personal__name">{firstName} {lastName}</h1>
                    <div className="personal__items">
                        {/* tslint:disable:max-line-length */}
                        <PersonalDataItem name="birth-date-place" title="Birthdate, -place" value={`${dateFormatted}, ${birthPlace}`} />
                        <PersonalDataItem name="nationality" title="Nationality" value={nationality} />
                        <PersonalDataItem name="contact" title="Contact" value={contact} />
                        <PersonalDataItem name="address" title="Address" value={address} />
                        <PersonalDataItem name="martial-status" title="Martial Status" value={martialStatus} />
                        {/* tslint:enable:max-line-length */}
                    </div>
                </div>
            </div>
        );
    }
}
