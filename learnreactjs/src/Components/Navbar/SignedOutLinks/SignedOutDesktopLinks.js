import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import {
  DEMO_PAGE_ROUTE,
  SIGNIN_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE,
} from "../../../routes";

const SignedOutDesktopLinks = () => {
  return (
    <div>
      <li className={useRouteMatch(DEMO_PAGE_ROUTE) ? "active" : ""}>
        <NavLink to={DEMO_PAGE_ROUTE}>Demo</NavLink>
      </li>
      <li className={useRouteMatch(SIGNIN_PAGE_ROUTE) ? "active" : ""}>
        <NavLink to={SIGNIN_PAGE_ROUTE}>Sign In</NavLink>
      </li>
      <li className={useRouteMatch(SIGNUP_PAGE_ROUTE) ? "active" : ""}>
        <NavLink to={SIGNUP_PAGE_ROUTE}>Sign Up</NavLink>
      </li>
    </div>
  );
};

export default SignedOutDesktopLinks;
