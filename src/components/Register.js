import React, { Component } from "react";
import axios from "axios";
import { apiBaseUrl } from "../services/api";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { AppBar, RaisedButton, TextField} from "material-ui";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleRegister = () => {
    if (!this.state.email || !this.state.password) {
      alert("email or password cannot be empty");
      return;
    }
    //To be done:check for empty values before hitting submit
    const self = this;
    var payload = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(apiBaseUrl + "/register", payload)
      .then(response => {
        if (response.status === 200) {
          alert("Registration was successful. Please login.");
          self.props.history.push("/login");
        }
      })
      .catch(error => {
        alert("Email taken. Please choose a different one.", error);
      });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Register" />
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
            <RaisedButton
              label="Register"
              primary={true}
              style={style}
              onClick={() => this.handleRegister()}
            />
            <h4>
              Have an account? <a href="/login">Login</a>
            </h4>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15
};
export default Register;
