/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface ApplicationPageQueryVariables {
  accessCode: string,
};

export interface ApplicationPageQuery {
  application:  {
    id: string,
    personal:  {
      firstName: string | null,
      lastName: string | null,
      email: string,
      phone: string,
      nationality: string | null,
      martialStatus: string | null,
      birthDate: string | null,
      birthPlace: string | null,
      addressLine1: string | null,
      addressLine2: string | null,
      addressLine3: string | null,
      addressLine4: string | null,
    },
    color: string,
    education:  Array< {
      id: string,
      institution: string,
      degree: string,
      description: string,
      startDate: string,
      endDate: string | null,
    } >,
    work:  Array< {
      id: string,
      employer: string,
      role: string,
      description: string,
      startDate: string,
      endDate: string | null,
    } >,
    skillGroups:  Array< {
      id: string,
      title: string,
      skills:  Array< {
        id: string,
        description: string,
      } >,
    } >,
  } | null,
};

export interface ApplicationEducationApplicationFragment {
  color: string,
  education:  Array< {
    id: string,
    institution: string,
    degree: string,
    description: string,
    startDate: string,
    endDate: string | null,
  } >,
};

export interface ApplicationEducationEducationFragment {
  id: string,
  institution: string,
  degree: string,
  description: string,
  startDate: string,
  endDate: string | null,
};

export interface ApplicationPersonalPersonalFragment {
  firstName: string | null,
  lastName: string | null,
  email: string,
  phone: string,
  nationality: string | null,
  martialStatus: string | null,
  birthDate: string | null,
  birthPlace: string | null,
  addressLine1: string | null,
  addressLine2: string | null,
  addressLine3: string | null,
  addressLine4: string | null,
};

export interface ApplicationSkillGroupSkillGroupFragment {
  id: string,
  title: string,
  skills:  Array< {
    id: string,
    description: string,
  } >,
};

export interface ApplicationSkillGroupsApplicationFragment {
  skillGroups:  Array< {
    id: string,
    title: string,
    skills:  Array< {
      id: string,
      description: string,
    } >,
  } >,
};

export interface ApplicationWorkExperienceApplicationFragment {
  color: string,
  work:  Array< {
    id: string,
    employer: string,
    role: string,
    description: string,
    startDate: string,
    endDate: string | null,
  } >,
};

export interface ApplicationWorkExperienceWorkFragment {
  id: string,
  employer: string,
  role: string,
  description: string,
  startDate: string,
  endDate: string | null,
};
