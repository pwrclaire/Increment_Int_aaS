import React, { Component } from "react";
import axios from "axios";
import { apiBaseUrl } from "../services/api";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { RaisedButton, TextField, CircularProgress } from "material-ui";

class Register extends Component {
    state = {
      email: "",
      password: "",
      loading: false
  }

  handleRegister = () => {
    if (!this.state.email || !this.state.password) {
      alert("Email or Password cannot be empty");
      return;
    }
    this.setState({
      loading: true
    })
    const self = this;
    const payload = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(apiBaseUrl + "/register", payload)
      .then(response => {
        if (response.status === 200) {
          alert("Registration was successful. You will be redirected to the login page.");
          self.props.history.push("/login");
        }
      })
      .catch(error => {
        this.setState({
          loading: false
        })
        alert(error.response.data);
      });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <div className="nav">REGISTER</div>
            <TextField
              text="email"
              hintText="Enter your email"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
              onKeyPress={event => {
                if (event.key === "Enter") {
                  this.handleRegister();
                }
              }}
            />
            <br />
            {this.state.loading ?
            <CircularProgress/> :
            <RaisedButton
              label="Register"
              primary={true}
              onClick={() => this.handleRegister()}
            />}
            <h4>
              Have an account? <a href="/login">Login</a>
            </h4>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Register;
