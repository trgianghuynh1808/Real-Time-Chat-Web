import React from "react";

import VerticalBar from "components/VerticalBar";

const Layout = ({ children }) => {
  return (
    <div className="row">
      <div className="col-3">
        <VerticalBar />
      </div>
      <div className="col-9">{children}</div>
    </div>
  );
};

export default Layout;
