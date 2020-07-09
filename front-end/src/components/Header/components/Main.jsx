import React from "react";

const Main = ({ curDate }) => {
  return (
    <div className="row justify-content-between align-items-center">
      <div className="col-4">
        <i className="far fa-calendar-alt header__icon"></i>
        <span className="ml-3">{curDate}</span>
      </div>
      <div className="col-1">
        <i className="fas fa-bell header__icon float-right mr-3 cursor-pointer"></i>
      </div>
    </div>
  );
};

export default Main;
