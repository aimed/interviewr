// import './application-create-form.css';

// import * as React from 'react';

// import { PersonalCreateMutation, WorkCreateMutation } from '../../operation-result-types';

// import { ExecutionResult } from 'react-apollo';
// import { PersonalCreateFormWithData } from '../../personal/PersonalCreateForm';
// import { PersonalSummaryWithData } from '../../personal/PersonalSummary';
// import { WorkCreateFormWithData } from '../../work/WorkCreateForm';
// import { observable } from 'mobx';
// import { observer } from 'mobx-react';

// /**
//  * Stores the current application process.
//  * 
//  * @class ApplicationCreateStore
//  */
// class ApplicationCreateStore {
//   @observable
//   public personal: string | null = null;

//   @observable
//   public workHistory: string[] = [];

//   /** 
//    * 
//    */
//   public reset(): void {
//     this.personal = null;
//   }
// }

// /** 
//  * A store instance to use for the application state.
//  */
// const store = new ApplicationCreateStore();

// export interface ApplicationCreateFormState { }
// export interface ApplicationCreateFormProps { }

// @observer
// export class ApplicationCreateForm extends React.Component<ApplicationCreateFormProps, ApplicationCreateFormState> {
//   setPersonal = (result: ExecutionResult<PersonalCreateMutation>) => {
//     if (result && result.data && result.data.PersonalCreate) {
//       store.personal = result.data.PersonalCreate.personal.id;
//     }
//   }

//   addWork = (result: ExecutionResult<WorkCreateMutation>) => {
//     if (result && result.data && result.data.WorkCreate) {
//       store.workHistory = [result.data.WorkCreate.work.id, ...store.workHistory];
//     }
//   }

//   removeWork = (id: string) => {
//     store.workHistory = store.workHistory.filter(history => history !== id);
//   }

//   get personalSection() {
//     return (
//       <section>
//         <h2>Personal details</h2>
//         {!store.personal
//           ?
//           <PersonalCreateFormWithData
//             onResult={this.setPersonal}
//             onError={e => console.warn(e)}
//           />
//           :
//           <PersonalSummaryWithData personalId={store.personal} />}
//       </section>
//     );
//   }

//   get workSection() {
//     return (
//       <section>
//         <h2>Work experience</h2>
//         <WorkCreateFormWithData 
//           onResult={this.addWork} 
//           onError={e => console.warn(e)}
//         />
//       </section>
//     );
//   }

//   get educationSection() {
//     return (
//       <section>
//         <h2>Education</h2>
//       </section>
//     );
//   }

//   get skillsSection() {
//     return (
//       <section>
//         <h2>Skills</h2>
//       </section>
//     );
//   }

//   render() {
//     return (
//       <section className="application-create-form">
//         <h1>Apply for a job!</h1>
//         {this.personalSection}
//         {this.workSection}
//         {this.educationSection}
//         {this.skillsSection}
//       </section>
//     );
//   }
// }
