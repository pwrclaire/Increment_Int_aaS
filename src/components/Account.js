import React, { Component } from "react";
import Cookies from "js-cookie";

import Integers from "./Integers";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

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
          <div className="nav">My Account
          <span
            style={styles.logout}
            onClick={() => {
                this.logout();
              }}
            >
              Logout
            </span>
          </div>
          <br />
          <Integers />
          <br />

        </div>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  logout: {
    right:'0',
    height: '60px',
    position:'fixed',
    cursor: 'pointer',
    fontSize: '20px',
    paddingRight: '10px'
  }
}

export default Account;
