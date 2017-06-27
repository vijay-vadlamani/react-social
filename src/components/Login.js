import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({type: 'UPDATE_FIELD_AUTH', key: 'email', value}),
  onChangePassword: value =>
    dispatch({type: 'UPDATE_FIELD_AUTH', key: 'password', value}),
  onSubmit: (email, password) => 
    dispatch({type:'LOGIN', payload: agent.Auth.login(email, password) })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.onSubmit = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }
  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <a>
                  Need an account?
                </a>
              </p>

              <form onSubmit={this.submitForm(email, password)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input type="email" className="form-control form-control-lg" placeholder="Email" value={email} onChange={this.changeEmail} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input type="password" className="form-control form-control-lg" placeholder="Password" value={password} onChange={this.changePassword}/>
                  </fieldset>

                  <button type="submit" className="btn btn-lg btn-primary pull-xs-right" disabled={this.props.inProgress}>Sign In</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);