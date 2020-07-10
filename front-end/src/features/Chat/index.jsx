import React from "react";
import { Switch, useRouteMatch, Route } from "react-router-dom";

import Main from "./pages/Main";
import "./style.scss";

const Chat = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url} component={Main} />
    </Switch>
  );
};

export default Chat;
