import { Formik } from "formik";
import React, { Component } from "react";
import { GoogleLoginButton } from "react-social-login-buttons";
import "./SignUp.css";
import * as Yup from "yup";
import { googleSignIn, signUpUser } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class SignUp extends Component {
  // Sign Up Page Component
  //
  // This page deals with the user Sign Up process. It uses formik to handle form input and validation.
  //
  state = {};

  handleSubmit = (data) => {
    this.props.signUp(data);
  };

  googleLogin = () => {
    this.props.googleSignIn();
  };

  render() {
    const { auth } = this.props;
    if (auth.uid) {
      return <Redirect to="/notes" />;
    }
    return (
      <div className="container sign-up-container">
        <h1 className="sign-up-title center-align">Sign Up.</h1>
        <p className="sign-up-description center-align">
          Enter your login details below to sign up.
        </p>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(5, "Please enter your full name.")
              .required("Your name is required"),
            email: Yup.string()
              .email("The email address that you have entered is invalid.")
              .min(3, "The email must be atleast 3 characters long")
              .required("An email is required"),
            password: Yup.string()
              .min(8, "The password must be atleast 8 characters long.")
              .required("A password is required"),
          })}
          onSubmit={this.handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form className="sign-up-form-container" onSubmit={handleSubmit}>
              {/* Name Input Field */}
              <div className="input-field">
                <i className="material-icons prefix">person</i>
                <input
                  id="name"
                  type="text"
                  className={
                    errors.name && touched.name
                      ? "invalid"
                      : touched.name && !errors.name
                      ? "valid"
                      : ""
                  }
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <label htmlFor="name">Full Name (Example: John Doe)</label>
                <span className="helper-text" data-error={errors.name}></span>
              </div>
              {/* Email Input Field */}
              <div className="input-field">
                <i className="material-icons prefix">email</i>
                <input
                  id="email"
                  type="text"
                  className={
                    errors.email && touched.email
                      ? "invalid"
                      : touched.email && !errors.email
                      ? "valid"
                      : ""
                  }
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <span className="helper-text" data-error={errors.email}></span>
              </div>
              {/* Password Input Field */}
              <div className="input-field">
                <i className="material-icons prefix">lock</i>
                <input
                  id="password"
                  type="password"
                  className={
                    errors.password && touched.password
                      ? "invalid"
                      : !errors.password && touched.password
                      ? "valid"
                      : ""
                  }
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <span
                  className="helper-text"
                  data-error={errors.password}
                ></span>
              </div>
              {/* Auth Error */}
              <div className="row center-align">
                {this.props.authError ? (
                  <p className="red-text">{this.props.authError.message}</p>
                ) : null}
              </div>
              {/* Google Auth Error */}
              <div className="row center-align">
                {this.props.googleAuthError ? (
                  <p className="red-text">
                    {this.props.googleAuthError.message}
                  </p>
                ) : null}
              </div>
              {/* Sign Up Button */}
              {this.props.authLoading ? null : (
                <div className="row center-align">
                  <button
                    className="btn btn-large z-depth-2 waves-effect indigo darken-1 waves-light"
                    type="submit"
                    name="action"
                  >
                    Sign Up
                    <i className="material-icons right">person_add</i>
                  </button>
                </div>
              )}
            </form>
          )}
        </Formik>
        {this.props.authLoading ? (
          <div className="loader">Loading...</div>
        ) : (
          <span>
            <div className="row center-align sign-up-or-row">
              <h5 className="sign-up-or">OR</h5>
            </div>
            <div className="row center-align google-login-row">
              <GoogleLoginButton
                align="center"
                style={{ background: "#3949ab" }}
                activeStyle={{ background: "#283593" }}
                onClick={this.googleLogin}
              />
            </div>
          </span>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    authLoading: state.auth.authLoading,
    auth: state.firebase.auth,
    googleAuthError: state.auth.googleAuthError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUpUser(newUser)),
    googleSignIn: () => dispatch(googleSignIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
