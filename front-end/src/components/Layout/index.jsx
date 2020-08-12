import React from "react";
import { isBrowser, isMobile } from "react-device-detect";

import VerticalBar from "components/VerticalBar";
import Header from "components/Header";
import FriendList from "components/FriendList";

const Layout = ({ children }) => {
  return (
    <div className="row">
      {isBrowser && (
        <div className="col-lg-3 pr-0">
          <VerticalBar />
        </div>
      )}
      <div className="col-12 col-md-9  none-padding">
        <Header />
        <div className="container-fluid">
          <div className="row">
            {isMobile && (
              <div className="col-12 col-md-3 none-padding">
                <FriendList />
              </div>
            )}
            <div className="col-12 col-md-9 col-lg-8 none-padding">
              {children}
            </div>
            {isBrowser && (
              <div className="col-md-3 col-lg-4 none-padding">
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
