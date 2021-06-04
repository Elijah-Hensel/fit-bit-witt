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
        <svg xmlns="http://www.w3.org/2000/svg">
          <filter id="motion-blur-filter" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="100 0"></feGaussianBlur>
          </filter>
        </svg>
        <span filter-content="F">FitnessTrac-kr</span>
        <p>
          Getting in shape has never been <b>easier</b>
        </p>
      </div>
    </>
  );
};

export default Home;
