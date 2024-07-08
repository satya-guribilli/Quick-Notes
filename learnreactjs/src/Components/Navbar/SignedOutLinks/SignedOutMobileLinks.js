import React from "react";
import { NavLink } from "react-router-dom";
import {
  DEMO_PAGE_ROUTE,
  SIGNIN_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE,
} from "../../../routes";

const SignedOutMobileLinks = () => {
  return (
    <div>
      <li>
        <NavLink to={DEMO_PAGE_ROUTE} activeClassName="active">
          Demo
        </NavLink>
      </li>
      <li>
        <NavLink to={SIGNIN_PAGE_ROUTE} activeClassName="active">
          Sign In
        </NavLink>
      </li>
      <li>
        <NavLink to={SIGNUP_PAGE_ROUTE} activeClassName="active">
          Sign Up
        </NavLink>
      </li>
    </div>
  );
};

export default SignedOutMobileLinks;
