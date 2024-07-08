/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import { NOTES_ROUTE } from "../../../routes";
import "./SignedInLinks.css";

const SignedInMobileLinks = ({ profile, logout }) => {
  return (
    <div>
      <li>
        <a className="waves-effect user-icon-text">
          {profile.name
            ? profile.name
            : profile.displayName
            ? profile.displayName
            : ""}
        </a>
      </li>
      <li>
        <div className="divider"></div>
      </li>
      <li>
        <NavLink
          to={NOTES_ROUTE}
          activeClassName="active"
          className="waves-effect"
        >
          Notes
        </NavLink>
      </li>
      <li>
        <a className="waves-effect" onClick={logout}>
          Logout
        </a>
      </li>
    </div>
  );
};

export default SignedInMobileLinks;
