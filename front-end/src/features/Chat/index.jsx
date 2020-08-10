import React from "react";
import { Switch, useRouteMatch, Route } from "react-router-dom";

import Main from "./pages/Main";
import "./style.scss";
import Layout from "components/Layout";

const Chat = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Layout>
        <Route exact path={match.url} component={Main} />
      </Layout>
    </Switch>
  );
};

export default Chat;
