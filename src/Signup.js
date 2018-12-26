import React, {Component} from 'react';
import FormError from './FormError';
import firebase from './Firebase';



class Signup extends Component{
  
  constructor(props){
    super(props);
    this.state = {
      displayName: '',
      email: '',
      passOne: '',
      passTwo: '',
      errorMessage: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    const state = this.state;
    state[e.target.id] = e.target.value;
    if(e.target.id === "passOne" || e.target.id === "passTwo"){
      state["errorMessage"] = null;
    }
    this.setState(state);
  }

  handleSubmit(e){
    e.preventDefault();
    const state = this.state;
    if(state.passOne !== state.passTwo){
      this.setState({errorMessage: 'Passwords do not match'})
    }
    else if(state.passOne.length < 6){
      this.setState({errorMessage: 'Password must be at least 6 characters long'})
    }
    else{
      
      this.setState({errorMessage: null});
      var registrationInfo = {
        displayName: state.displayName,
        email: state.email,
        password: state.passOne
      }

      firebase.auth().createUserWithEmailAndPassword(registrationInfo.email, registrationInfo.password)
      .then(() => {
        this.props.registerUser(registrationInfo.displayName);
      })
      .catch(function(error) {
        var errorMessage = error.message;
        if(errorMessage){
          this.setState({errorMessage: errorMessage})
        }
        
      });



    } 

  }

  render(){
    return(
      <form className="mt-5" onSubmit={this.handleSubmit}>
        <div className="container">
          <div className="card">
            <h3 className="card-header">Signup</h3>
            <div className="card-body">
                {this.state.errorMessage && (<FormError errorMessage={this.state.errorMessage}/>) }
                <div className="form-group">
                  <label htmlFor="displayName">Display Name</label>
                  <input type="text" className="form-control" id="displayName" aria-describedby="display name" 
                           onChange={this.handleChange} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control" id="email" aria-describedby="email" 
                         onChange={this.handleChange} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="passOne">Password</label>
                  <input type="password" className="form-control" id="passOne" 
                         onChange={this.handleChange} required/>
                </div>
                <div className="form-group">
                  <label htmlFor="passTwo">Password</label>
                  <input type="password" className="form-control" id="passTwo" 
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

export default Signup;