import { React } from "react";
import { Route } from "react-router-dom";
import {
  ACTIVITIES_ROUTE,
  HOME_ROUTE,
  MY_ROUTINES_ROUTE,
  ROUTINES_ROUTE,
  LOGIN_ROUTE,
  SIGNUP_ROUTE,
} from "../constants";
import Home from "./Home";
import Login from "./Login";
import MyRoutines from "./My-Routines";
import Routines from "./Routines";
import Signup from "./Signup";
import Activities from "./Activities";
const Pages = () => {
  return (
    <>
      <Route path={HOME_ROUTE}>
        <Home />
      </Route>
      <Route path={ACTIVITIES_ROUTE}>
        <Activities />
      </Route>
      <Route path={MY_ROUTINES_ROUTE}>
        <MyRoutines />
      </Route>
      <Route path={ROUTINES_ROUTE}>
        <Routines />
      </Route>
      <Route path={LOGIN_ROUTE}>
        <Login />
      </Route>
      <Route path={SIGNUP_ROUTE}>
        <Signup />
      </Route>
    </>
  );
};

export default Pages;
