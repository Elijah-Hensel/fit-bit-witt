import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import passwordHash from "password-hash";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const RegisterForm = () => {
  const classes = useStyles();
  const [registeredUser, setRegisteredUser] = useState(false);
  const [username, setUser] = useState();
  const [password, setPassword] = useState();
  const registerUser = async () => {
    setRegisteredUser(true);
    localStorage.setItem("loggedIn", true);
    try {
      const response = await fetch(
        "http://fitnesstrac-kr.herokuapp.com/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };

  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="register-form"
        noValidate
        autoComplete="on"
        onSubmit={onFormSubmit}
      >
        <h3>Username</h3>
        <TextField
          required
          id="username-form"
          label="Required"
          defaultValue=""
          variant="outlined"
          onInput={(e) => {
            setUser(e.target.value);
          }}
        />
        <h3>Password</h3>
        <TextField
          required
          id="password-form"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          className="initial-password"
          style={{ marginBottom: "10px" }}
          onInput={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          required
          id="password-confirm-form"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          className="confirm-password"
        />
        <Button type="submit" style={{ width: "25%" }}>
          Register
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
