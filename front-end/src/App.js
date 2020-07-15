import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";

import "./App.scss";
import "assets/styles/global.scss";
import NotFound from "components/NotFound";
import { getToken } from "libs/token-libs";

const Chat = React.lazy(() => import("features/Chat"));
const Login = React.lazy(() => import("features/Login"));

const checkAuth = () => {
  const token = getToken();
  const refreshToken = getToken("_refresh_real-time-chat");

  if (!token || !refreshToken) {
    return false;
  }

  try {
    const { expDate } = jwtDecode(refreshToken);
    if (expDate < new Date().getTime()) return false;
    return true;
  } catch (error) {
    return false;
  }
};

const AuthRoute = ({ component, ...rest }) => {
  if (checkAuth()) return <Route component={component} {...rest} />;

  return <Redirect to={{ pathname: "/account/login" }} />;
};

function App() {
  return (
    <div className="chat-app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/account/login" />

            <AuthRoute path="/chat" component={Chat} />
            <Route path="/account" component={Login} />

            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
        <ToastContainer />
      </Suspense>
    </div>
  );
}

export default App;
