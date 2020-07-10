import React from "react";

import VerticalBar from "components/VerticalBar";
import Header from "components/Header";
import FriendList from "components/FriendList";

const Layout = ({ children }) => {
  return (
    <div className="row">
      <div className="col-2 pr-0">
        <VerticalBar />
      </div>
      <div className="col-10 none-padding">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-9 none-padding">{children}</div>
            <div className="col-3 none-padding">
              <FriendList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
