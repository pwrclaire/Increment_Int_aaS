import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { apiBaseUrl } from "../services/api";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { RaisedButton, TextField, CircularProgress } from "material-ui";

class Login extends Component {
    state = {
      email: "",
      password: "",
      buttonLabel: "Register",
      loading: false
    };

  handleLogin = () => {
    const self = this;
    const payload = {
      email: this.state.email,
      password: this.state.password
    };
    this.setState({
      loading: true
    })
    axios
      .post(apiBaseUrl + "/login", payload)
      .then(response => {
        if (response.status === 200) {
          const token = response.data.Authorization;
          Cookies.set("auth", token);
          self.props.history.push("/account");
          window.location.reload();
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
            <div className="nav">LOGIN</div>
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
            {this.state.loading ?
            <CircularProgress/> :
             <RaisedButton
              label="Login"
              primary={true}
              onClick={() => this.handleLogin()}
            />
            }
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
