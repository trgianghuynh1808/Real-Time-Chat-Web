import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";
import "assets/styles/global.scss";
import NotFound from "components/NotFound";

const Chat = React.lazy(() => import("features/Chat"));
const Login = React.lazy(() => import("features/Login"));

function App() {
  return (
    <div className="chat-app">
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Switch>
            <Redirect exact from="/" to="/account/login" />

            <Route path="/chat" component={Chat} />
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
