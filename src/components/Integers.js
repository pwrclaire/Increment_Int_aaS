import React, { Component } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { apiBaseUrl } from "../services/api";
import { RaisedButton, TextField, CircularProgress } from "material-ui";

const payload = Cookies.get("auth");

class Integers extends Component {
  state = {
    integer: "",
    value: "",
    loading: true
  };

  componentDidMount() {
    this.getInteger();
  }

  getInteger = () => {
    axios
      .get(apiBaseUrl + "/current", {
        headers: {
          authorization: payload
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            integer: response.data.integer,
            loading: false
          });
          this.displayInteger();
        }
      })
      .catch(err => {
        alert(err.response.data);
      });
  };

  displayInteger = () => {
    const data = this.state.integer;
    if (data > -1) {
      return <div>Current Integer: {data}</div>;
    }
  };

  incrementInteger = () => {
    this.setState({
      loading: true
    });
    axios
      .get(apiBaseUrl + "/next", {
        headers: {
          authorization: payload
        }
      })
      .then(() => {
        this.getInteger();
      })
      .catch(err => {
        alert(err.response.data);
      });
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  setInteger = () => {
    this.setState({
      loading: true
    })
    const value = this.state.value;
    const maxNumber = Number.MAX_SAFE_INTEGER;
    if (value > -1 && value < maxNumber) {
      axios
        .put(
          apiBaseUrl + "/current",
          { current: value },
          {
            headers: {
              authorization: payload
            }
          }
        )
        .then(() => {
          this.setState({
            value: ""
          });
          this.getInteger();
        })
        .catch(err => {
          alert(err.response.data);
        });
    } else {
      alert("Cannot set integer to null or negative");
      return;
    }
  };

  render() {
    // Button style
    const buttonState = this.state.value === "" || this.state.value === null || this.state.value < 0 ? true : false;
    return (
      <div>
        <div>{this.displayInteger()}</div>
        <br/>
        {this.state.loading ?
          <CircularProgress/> :
          <RaisedButton
            primary={true}
            label="Next Integer"
            onClick={() => this.incrementInteger()}
          >
        </RaisedButton>}
        
        <br/>
        <TextField
          type="number"
          hintText="New Integer"
          floatingLabelText="New Integer"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <RaisedButton
          primary={true}
          label="Reset Integer"
          disabled={buttonState}
          onClick={() => this.setInteger()}
          >
        </RaisedButton>
      </div>
    );
  }
}

export default Integers;
