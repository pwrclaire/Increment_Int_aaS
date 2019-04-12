import React, { Component } from "react";
import Cookies from "js-cookie";

import Integers from "./Integers";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";

class Account extends Component {
  logout = () => {
    // Clear session
    Cookies.remove("auth");
    this.props.history.push("/login");
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="My Account">
            <button
              onClick={() => {
                this.logout();
              }}
            >
              Logout
            </button>
          </AppBar>
          <br />
          <Integers />
          <br />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Account;
