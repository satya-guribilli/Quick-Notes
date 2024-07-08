import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Demo from "./Pages/Demo";
import Notes from "./Pages/Notes/Notes";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/SignUp/SignUp";
import {
  DEMO_PAGE_ROUTE,
  NOTES_ROUTE,
  SIGNIN_PAGE_ROUTE,
  SIGNUP_PAGE_ROUTE,
} from "./routes";
import logo from "./notes-logo.png";

// const M = require("materialize-css");

const AuthIsLoaded = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth))
    return (
      <div
        className="valign-wrapper indigo darken-1"
        style={{ height: "100vh" }}
      >
        <div className="row center-align">
          <img src={logo} alt="Notes" className="notes-splash-image" />
        </div>
      </div>
    );
  return children;
};

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthIsLoaded>
          <Navbar />
          <Switch>
            <Route path={DEMO_PAGE_ROUTE} component={Demo} />
            <Route path={SIGNIN_PAGE_ROUTE} component={SignIn} />
            <Route path={SIGNUP_PAGE_ROUTE} component={SignUp} />
            <Route path={NOTES_ROUTE} component={Notes} />
            <Route exact path="/">
              <Redirect to={DEMO_PAGE_ROUTE} />
            </Route>
          </Switch>
        </AuthIsLoaded>
      </BrowserRouter>
    </div>
  );
};

export default App;
