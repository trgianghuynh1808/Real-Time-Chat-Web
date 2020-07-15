import React from "react";
import { Switch, useRouteMatch, Route } from "react-router-dom";

import Main from "./pages/Main";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import "./style.scss";
import "./template/main.css";
import "./template/util.css";

const Login = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${match.url}/login`} component={Main} />
      <Route exact path={`${match.url}/register`} component={Register} />
      <Route
        exact
        path={`${match.url}/forgot-password`}
        component={ForgotPassword}
      />
    </Switch>
  );
};

export default Login;
