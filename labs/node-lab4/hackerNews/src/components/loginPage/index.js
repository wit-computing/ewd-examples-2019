import React, {Component} from "react";
import * as api from '../../api';
import Auth from '../../auth';
import {Redirect} from 'react-router'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmpassword: "",
      authenticated: false,
      action: "Log In"
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSignUp = async (event) => {
    try {
      if (this.state.password !== this.state.comfirmpassword) {
        alert('Passwords Must Match');
        console.log("failed")
      } else {
        const result = await api.signup(this.state.username, this.state.password);
        this.setState({
          authenticated: true
        })
      }

    } catch (e) {
      alert(`Registration Failed ${e}`)
      event.preventDefault();
    }
  };

  submitForm = event => {
    event.preventDefault()
  }

  validateForm = () => {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleLogin = async (event) => {
    try {
      const result = await api.login(this.state.username, this.state.password);
      Auth.authenticateUser(result.token);
      this.setState({
        authenticated: true
      })
    } catch (e) {
      alert(`Authentication Failed: ${e}`)
      event.preventDefault();
    }
  };

  switchView = event => {
    this.setState({
      action: event.target.value
    })
    event.preventDefault()
  }

  render() {

    const { from } = this.props.location.state || '/';
    const { authenticated } = this.state;

    return (
   <div className="col-md-4 col-md-offset-3">
   <h2  className="card-title mb-4 mt-1">{this.state.action}</h2>
	 <form onSubmit={this.submitForm}>
    <div className="form-group">
    	<label>Your username</label>
        <input id="username" name="" className="form-control" placeholder="username" onChange={this.handleChange} />
    </div> 
    <div  className="form-group">
    	<label>Your password</label>
      <input id="password" className="form-control" placeholder="******" type="password" onChange={this.handleChange}/>
        {this.state.action==="Register" && <div><label>Confirm password</label><input id="comfirmpassword" className="form-control" placeholder="******" type="password" onChange={this.handleChange}/></div>}
    </div>
    <div className="form-group">
      {this.state.action==="Log In" && <button type="submit"  disabled={!this.validateForm()} className="btn btn-primary btn-block" onClick={this.handleLogin}> Log In  </button>}
      {this.state.action==="Register" && <button type="submit" disabled={!this.validateForm()} className="btn btn-primary btn-block" onClick={this.handleSignUp}> Register  </button>}
      <div style={{float: 'left',paddingTop:10}}>
        {this.state.action==="Log In" && <button   type="submit"  onClick={this.switchView} className="btn btn-secondary" value="Register">Register</button>}
        {this.state.action==="Register" && <button type="submit"   onClick={this.switchView} className="btn btn-secondary" value="Log In">Log In</button>}
      </div>
      <div style={{float: 'right',paddingTop:10}}>
        <button type="button"  className="btn btn-secondary" >Forgot?</button>
      </div>
  </div>
</form>
{authenticated && (<Redirect to={from || '/'}/>)}
</div>
    );
  }
}
export default Login;