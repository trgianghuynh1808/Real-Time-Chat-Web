import React from "react";
import { isBrowser } from "react-device-detect";

import VerticalBar from "components/VerticalBar";
import Header from "components/Header";
import FriendList from "components/FriendList";

const Layout = ({ children }) => {
  return (
    <div className="row">
      {isBrowser && (
        <div className="col-md-2 pr-0">
          <VerticalBar />
        </div>
      )}
      <div className="col-12 col-md-10 none-padding">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-9 none-padding">{children}</div>
            {isBrowser && (
              <div className="col-md-3 none-padding">
                <FriendList />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
