/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import "./Navbar.css";
import logo from "../../notes-logo.png";
import { connect } from "react-redux";
import SignedInDesktopLinks from "./SignedInLinks/SignedInDesktopLinks";
import SignedOutDesktopLinks from "./SignedOutLinks/SignedOutDesktopLinks";
import SignedInMobileLinks from "./SignedInLinks/SignedInMobileLinks";
import SignedOutMobileLinks from "./SignedOutLinks/SignedOutMobileLinks";
import { logoutUser } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import { DEMO_PAGE_ROUTE } from "../../routes";

const M = require("materialize-css");

const Navbar = (props) => {
  useEffect(() => {
    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
  });

  const desktopLinks = props.auth.uid ? (
    <SignedInDesktopLinks profile={props.profile} logout={props.logout} />
  ) : (
    <SignedOutDesktopLinks />
  );

  const mobileLinks = props.auth.uid ? (
    <SignedInMobileLinks profile={props.profile} logout={props.logout} />
  ) : (
    <SignedOutMobileLinks />
  );

  return (
    <div>
      <nav>
        <div className="nav-wrapper indigo darken-1">
          <Link to={DEMO_PAGE_ROUTE} className="brand-logo center">
            <img
              src={logo}
              alt="Notes Logo"
              className="navbar-notes-logo hide-on-small-only"
            />
            <img
              src={logo}
              alt="Notes Logo"
              className="navbar-notes-logo-small show-on-small hide-on-med-and-up"
            />
          </Link>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">{desktopLinks}</ul>
        </div>
      </nav>

      <ul className="sidenav sidenav-close" id="mobile-demo">
        {mobileLinks}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logoutUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
