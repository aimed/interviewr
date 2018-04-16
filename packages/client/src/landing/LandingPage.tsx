import './landing.css';

import * as React from 'react';

import { ApplicationPageQuery, ApplicationPageQueryVariables } from 'operation-result-types';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { WithApolloClient, withApollo } from 'react-apollo';

import { APPLICATION_PAGE_QUERY } from 'application/ApplicationPage';
import { ChangeEventHandler } from 'react';
import { MobxForm } from '../common/MobxForm';
import { observer } from 'mobx-react';

const PLACEHOLDER = 'HERE';

interface AccessForm {
  accessCode: string;
}

export interface LandingPageState { }
export interface LandingPageProps extends RouteComponentProps<{}>, WithApolloClient<{}> { }

export const LandingPage = withRouter(withApollo(observer(
  class R extends React.Component<LandingPageProps, LandingPageState> {
    form = new MobxForm<AccessForm>({
      accessCode: { defaultValue: PLACEHOLDER, label: 'Access code' }
    });

    get hasError(): boolean {
      const state = this.props.location.state;
      if (state && state.oopsie) {
        return true;
      }
      return false;
    }

    onFocus = () => {
      if (this.form.fields.accessCode.value === PLACEHOLDER) {
        this.form.fields.accessCode.value = '';
      }
    }

    onChange: ChangeEventHandler<HTMLInputElement> = event => {
      this.form.fields.accessCode.value = event.target.value;
    }

    submit = async (data: AccessForm) => {
      const accessCode = this.form.fields.accessCode.value;
      const variables: ApplicationPageQueryVariables = { accessCode };
      const result = await this.props.client.query<ApplicationPageQuery>({ query: APPLICATION_PAGE_QUERY, variables });
      if (result.data && result.data.application) {
        this.props.history.push(`/application/${accessCode}`);
      } else {
        this.props.history.push({ state: { oopsie: true }});
      }
    }

    render() {
      const { submit, submitting } = this.form;
      const accessCodeField = this.form.fields.accessCode;
      return (
        <div className="landing-page">
          {this.hasError && !submitting && <p className="landing-page__oopsie">That code didn't seem to work.</p>}
          {submitting && <p>Loading</p>}
          <h1 className="landing-page__text">Enter your access code</h1>
          <form onSubmit={submit(this.submit)}>
            <input
              className="landing-page__input-native-control landing-page__text"
              value={accessCodeField.value}
              onChange={this.onChange}
              onFocus={this.onFocus}
              ref={element => element && element.focus()}
              disabled={submitting}
            />
          </form>
          <div className="landing-page__get-in-touch">
            <Link to="/application/test">See my CV!</Link>
            <p>If you don't have an access code, but still want to get in touch, you can contact me here:</p>
            <p><a href="mailto:max@maxforhire.com">max@maxforhire.com</a></p>
          </div>
        </div>
      );
    }
  }
)));
