/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface ApplicationPageQueryVariables {
  accessCode: string,
};

export interface ApplicationPageQuery {
  application:  {
    id: string,
    color: string,
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
    education:  Array< {
      id: string,
      institution: string,
      degree: string,
      description: string | null,
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
        // A value between 1 and 5 indicating how well the skill is known
        proficiency: number | null,
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
    description: string | null,
    startDate: string,
    endDate: string | null,
  } >,
};

export interface ApplicationEducationEducationFragment {
  id: string,
  institution: string,
  degree: string,
  description: string | null,
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
    // A value between 1 and 5 indicating how well the skill is known
    proficiency: number | null,
  } >,
};

export interface ApplicationSkillGroupsApplicationFragment {
  skillGroups:  Array< {
    id: string,
    title: string,
    skills:  Array< {
      id: string,
      description: string,
      // A value between 1 and 5 indicating how well the skill is known
      proficiency: number | null,
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
