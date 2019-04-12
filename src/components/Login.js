import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { apiBaseUrl } from "../services/api";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { AppBar, RaisedButton, TextField} from "material-ui";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      buttonLabel: "Register",
      isLogin: true
    };
  }

  handleLogin = () => {
    const self = this;
    const payload = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(apiBaseUrl + "/login", payload)
      .then(function(response) {
        if (response.status === 200) {
          const token = response.data.Authorization;
          Cookies.set("auth", token);
          self.props.history.push("/account");
          window.location.reload();
        } else if (response.status === 401) {
          alert("email password do not match");
        } else {
          alert("email does not exist");
        }
      })
      .catch(function(error) {
        alert("email and password does not match");
      });
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Login" />
            <TextField
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
                  this.handleLogin();
                }
              }}
            />
            <br />
            <RaisedButton
              label="Login"
              primary={true}
              onClick={() => this.handleLogin()}
            />
            <br />
            <h4>
              Don't Have An Account? <a href="/register">Click here to register.</a>
            </h4>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Login;
