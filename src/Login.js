import React, {Component} from 'react';
import FormError from './FormError';
import firebase from './Firebase';
import {navigate} from '@reach/router';


class Login extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    const state = this.state;
    state[e.target.id] = e.target.value;
    state["errorMessage"] = null;
    this.setState(state);
  }

  handleSubmit(e){
    e.preventDefault();
    const state = this.state;

    this.setState({errorMessage: null});
      var loginInfo = {
        email: state.email,
        password: state.password
      }

      firebase.auth().signInWithEmailAndPassword(loginInfo.email, loginInfo.password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        var errorMessage = error.message;
        if(errorMessage){
          this.setState({errorMessage: errorMessage})
        }
        
      });

  }

  render(){
    return(
      <form className="mt-5" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="card">
            <h3 className="card-header">Login</h3>
            <div className="card-body">
                {this.state.errorMessage && (<FormError errorMessage={this.state.errorMessage}/>) }
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control" id="email" aria-describedby="email" 
                         onChange={this.handleChange} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" className="form-control" id="password" 
                         onChange={this.handleChange} required/>
                </div>
                <button type="submit" className="btn btn-primary btn-lg float-right">Submit</button>
            </div>
          </div>
        </div>
    </form>
  );

  }
}

export default Login;