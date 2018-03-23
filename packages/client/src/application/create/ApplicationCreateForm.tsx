import './application-create-form.css';

import * as React from 'react';

import { PersonalCreateFormWithData } from '../../personal/PersonalCreateForm';
import { PersonalSummaryWithData } from '../../personal/PersonalSummary';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

/**
 * Stores the current application process.
 * 
 * @class ApplicationCreateStore
 */
class ApplicationCreateStore {
  @observable
  public personal: string | null = null;

  /** 
   * 
   */
  public reset(): void {
    this.personal = null;
  }
}

/** 
 * A store instance to use for the application state.
 */
const store = new ApplicationCreateStore();

export interface ApplicationCreateFormState { }
export interface ApplicationCreateFormProps { }

@observer
export class ApplicationCreateForm extends React.Component<ApplicationCreateFormProps, ApplicationCreateFormState> {
  get personalSection() {
    return (
      <section>
        <h2>Personal details</h2>
        {!store.personal
          ?
          <PersonalCreateFormWithData
            onResult={r => store.personal = r.data.PersonalCreate && r.data.PersonalCreate.personal.id}
          />
          :
          <PersonalSummaryWithData personalId={store.personal} />}
      </section>
    );
  }

  get workSection() {
    return (
      <section>
        <h2>Work experience</h2>
      </section>
    );
  }

  get educationSection() {
    return (
      <section>
        <h2>Education</h2>
      </section>
    );
  }

  get skillsSection() {
    return (
      <section>
        <h2>Skills</h2>
      </section>
    );
  }

  render() {
    return (
      <section className="application-create-form">
        <h1>Apply for a job!</h1>
        {this.personalSection}
        {this.workSection}
        {this.educationSection}
        {this.skillsSection}
      </section>
    );
  }
}
