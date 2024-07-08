/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { NOTES_ROUTE } from "../../../routes";
import "./SignedInLinks.css";

const SignedInDesktopLinks = ({ profile, logout }) => {
  let initial = "";
  if (profile.initial) {
    initial = profile.initial.toUpperCase();
  } else if (profile.displayName) {
    initial = profile.displayName
      .split(" ")
      .map((item) => item[0])
      .join("")
      .toUpperCase();
  }
  return (
    <div>
      <li>
        <NavLink
          to={NOTES_ROUTE}
          className="btn btn-floating red accent-3 white-text user-icon-text"
        >
          {initial}
        </NavLink>
      </li>
      <li className={useRouteMatch(NOTES_ROUTE) ? "active" : ""}>
        <NavLink to={NOTES_ROUTE}>Notes</NavLink>
      </li>
      <li>
        <a onClick={logout}>Logout</a>
      </li>
    </div>
  );
};

export default SignedInDesktopLinks;
