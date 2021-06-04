import React from "react";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Login Page</h1>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
