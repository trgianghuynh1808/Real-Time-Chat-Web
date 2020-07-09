import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="row">
      <div className="col-3">left menu</div>
      <div className="col-9">{children}</div>
    </div>
  );
};

export default Layout;
