//Basically only the login screen, handles account creation and login
//Once you log in(auto on creation), the render function handles entering the rest of the app
import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase';
import autobind from 'class-autobind';
import LoginForm from './LoginForm.js';
import Home from './Home.js';
import NewAccountForm from './NewAccountForm.js';
import './App.css';
//https://www.iconfinder.com/icons/2427870/chopsticks_cup_noodles_food_instant_noodles_noodles_icon#size=128
import logo from './logo.svg';

class App extends Component {

  constructor(props){
    super();
    //user is not guaranteed to be logged in but LoggedIn is, they both represent the current user
    this.state = {loggedIn: null, user: null};
    autobind(this);
  }

  //initializes the app, firebase only used for authentication
  componentWillMount(){
    console.log('connecting to firebase');
    firebase.initializeApp({
      apiKey: "AIzaSyAjxKEZDpJ_pcIFTvBsZs7-qlYc16joAHk",
      authDomain: "chef-a7b51.firebaseapp.com",
      databaseURL: "https://chef-a7b51.firebaseio.com",
      projectId: "chef-a7b51",
      storageBucket: "",
      messagingSenderId: "433646003615"
    });
    document.title = "Chef";
  }



  //helper function to set user upon login because was getting an error on "this" in anonymous function
  onLogin(){
    this.setState({loggedIn: firebase.auth().currentUser});
  }

  //triggers when someone fills out the "create a new account" section, passed as
  //a prop to the NewAccountForm component. That component sends all of the fields
  //from the form in one object.
  handleAccountSubmit(user) {
    this.setState({user: user});
    //if the password and password confirmation don't match, reject
    if(user.password !== user.passwordConfirm){
      alert('Passwords do not match')
    }
    else {
      //add user
      //console.log(user);
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(() => {
        axios.get(`https://3n1o8iiw02.execute-api.us-east-1.amazonaws.com/0/chefs`)
          .then(response =>
            {
              console.log(response);
              //add current user's uid to the uid list in the databse
              var uids = response.data.res._source;
              var curId = firebase.auth().currentUser.uid;
              uids.uids.push(curId);

              //make first menu item for the new user
              const user = {
                items: [{name: "my first item", price: "5"}]
              };

              //inititialize menu with basic thing for this user
              axios.post(`https://3n1o8iiw02.execute-api.us-east-1.amazonaws.com/0/menu?uid=${curId}`,{user})
                .then(response => {
                  console.log(response);
                });

              //add user that just signed up to database
              //console.log(uids);
              axios.post(`https://3n1o8iiw02.execute-api.us-east-1.amazonaws.com/0/chefs`,{uids})
                .then(response => {
                  console.log(response);
                  this.onLogin();
                });
            });
          })
      .catch(function(error) {
      //Handle Errors
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode || errorMessage){
          alert(errorMessage);
          console.log(errorCode + errorMessage);
        }
      });


    }
  }

  //triggered when someone logs in normally, passed in as a prop to LoginForm component
  handleLogin(user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(() => {
      console.log("logged in")
      this.onLogin();
    })
    .catch(function(error) {
      // Handle Errors
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error" + errorCode + errorMessage);
    });
  }

  render() {
    if(!this.state.loggedIn){
      return (
        <div className = "App">
          <LoginForm onLogin = {this.handleLogin}/>
          <img src = {logo} className = "App-logo"/>
          <h3>Sign up for Chef</h3>
          <NewAccountForm onAccountSubmit = {this.handleAccountSubmit} />
        </div>

      );
    } else {
      //logged in
      return(
        <Home user = {this.state.loggedIn}/>
      );
    }
  }
}

export default App;
