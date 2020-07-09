import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.scss";
import "assets/styles/global.scss";
import NotFound from "components/NotFound";
import Layout from "components/Layout";

const Chat = React.lazy(() => import("features/Chat"));

function App() {
  return (
    <div className="chat-app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Redirect exact from="/" to="/chat" />

              <Route path="/chat" component={Chat} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
