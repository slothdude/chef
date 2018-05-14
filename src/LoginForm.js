import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import autobind from 'class-autobind';

class LoginForm extends Component {
  //similar to NewAccountForm
  constructor(props) {
    super(props);
    autobind(this);
    this.state = {email: '', password: ''};
  }

  handleChangeEmail(event) {
    this.setState({email: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    this.props.onLogin({email: this.state.email, password: this.state.password});
  }

  render() {
    return (
      <form>
        <label>
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
        <button type="button"
                className = "LoginButton"
                onClick = {this.handleSubmit}>
          Login
        </button>
      </form>
    );
  }
}

export default LoginForm;
