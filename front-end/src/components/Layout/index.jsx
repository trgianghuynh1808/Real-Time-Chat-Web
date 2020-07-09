import React from "react";

import VerticalBar from "components/VerticalBar";
import Header from "components/Header";

const Layout = ({ children }) => {
  return (
    <div className="row">
      <div className="col-2 pr-0">
        <VerticalBar />
      </div>
      <div className="col-10 none-padding">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Layout;
