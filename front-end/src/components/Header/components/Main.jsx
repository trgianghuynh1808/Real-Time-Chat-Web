import React from "react";

const Main = ({ curDate, handleLogOut }) => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-between align-items-center">
        <div className="col-4">
          <i className="far fa-calendar-alt header__icon"></i>
          <span className="ml-3">{curDate}</span>
        </div>
        <div className="col-1 d-flex align-items-center">
          <i className="fas fa-bell header__icon float-right mr-3 cursor-pointer"></i>

          <i
            className="fas fa-sign-out-alt header__icon cursor-pointer ml-2"
            onClick={handleLogOut}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Main;
