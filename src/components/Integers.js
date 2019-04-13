import React, { Component } from "react";
import axios from "axios";
import { apiBaseUrl } from "../services/api";
import Cookies from "js-cookie";
import RaisedButton from "material-ui/RaisedButton";
import { TextField } from "material-ui";
import CircularProgress from 'material-ui/CircularProgress'

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
        console.log("Resonse data: ", response);
        if (response.status === 200) {
          this.setState({
            integer: response.data.integer,
            loading: false
          });
          this.displayInteger();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  displayInteger = () => {
    const data = this.state.integer;
    console.log("state integer", data);
    if (data > -1) {
      console.log("are my in display data");
      return <div>Current Integer: {data}</div>;
    }
  };

  incrementInteger = () => {
    this.setState({
      loading: true
    })
    axios
      .get(apiBaseUrl + "/next", {
        headers: {
          authorization: payload
        }
      })
      .then(response => {
        console.log(response.data);
        this.getInteger();
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ value: event.target.value });
  };

  // TODO: Restrict to numbers
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
          { int: value },
          {
            headers: {
              authorization: payload
            }
          }
        )
        .then(response => {
          console.log(response);
          this.setState({
            value: ""
          });
          this.getInteger();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      alert("Cannot set integer to value greater 9007199254740991");
      return;
    }
  };

  render() {
    const buttonState =
      this.state.value === "" || this.state.value === null ? true : false;

    return (
      <div>
        <div>{this.displayInteger()}</div>
        <br/>
        {this.state.loading ?
          <CircularProgress/> :
          <RaisedButton
            style={styles.button}
            onClick={() => this.incrementInteger()}
          >
          Next Integer
        </RaisedButton>}
        
        <br/>
        <TextField
          type="number"
          hintText="New Integer"
          floatingLabelText="New Integer"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <RaisedButton onClick={() => this.setInteger()} disabled={buttonState}>
          Reset Integer
        </RaisedButton>
      </div>
    );
  }
}

const styles = () => ({
  button: {
    margin: "20px"
  },
  input: {
    display: "none"
  }
});

export default Integers;
