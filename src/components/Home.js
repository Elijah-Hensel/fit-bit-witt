import { React } from "react";

const Home = () => {
  const isLoggedIn = () => {
    return localStorage.getItem("loggedIn");
  };
  const USER = localStorage.getItem("username");
  return (
    <>
      <div className="home-main">
        <p>{isLoggedIn() ? `Hello ${USER}` : "Log In For Full Site Use"}</p>
        <span>FitnessTrac-kr</span>
        <p>
          Getting in shape has never been <b>easier</b>
        </p>
      </div>
    </>
  );
};

export default Home;
