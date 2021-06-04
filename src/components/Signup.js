import { React } from "react";
import RegisterForm from "./RegisterForm";

const Signup = () => {
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
        <h1>Signup Page</h1>
        <RegisterForm />
      </div>
    </>
  );
};

export default Signup;
