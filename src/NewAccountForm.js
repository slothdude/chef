import React, { Component } from 'react';
import './App.css';
import autobind from 'class-autobind';

class NewAccountForm extends Component {
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {email: '', password: ''};
  }

  //change the state when someone types
  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleChangePasswordConfirm(event) {
    this.setState({passwordConfirm: event.target.value});
  }

  handleSubmit(e) {
    //trim data and send to handler in app.js
    let email = this.state.email.trim();
    let password = this.state.password.trim();
    let passwordConfirm = this.state.passwordConfirm.trim();

    this.props.onAccountSubmit({ email: email, password: password,
      passwordConfirm: passwordConfirm});
  }

  render() {
    return (
      <form className = "NewAccountForm">
        <label className = "AccountLine">
          <input type="text"
                 value={this.state.email}
                 onChange={this.handleChangeEmail}
                 placeholder = "Email"
                 className = "LoginInput"
                 required = "True"/>
          <input type="password"
                 value={this.state.password}
                 onChange={this.handleChangePassword}
                 placeholder = "Password"
                 className = "LoginInput"
                 required = "True"/>
        </label>
        <label className = "AccountLine">
          <input type="password"
                 value={this.state.passwordConfirm}
                 onChange={this.handleChangePasswordConfirm}
                 placeholder = "Confirm Password"
                 className = "LoginInput"
                 required = "True"/>
        </label>
        
        <button type="button"
                className = "NewAccountButton"
                onClick = {this.handleSubmit}>
          Register
        </button>
      </form>
    );
  }
}

export default NewAccountForm;
