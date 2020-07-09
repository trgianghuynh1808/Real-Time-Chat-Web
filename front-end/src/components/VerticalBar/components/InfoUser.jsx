import React from "react";

import Images from "constants/images";

const InfoUser = ({ fullName, nickName }) => {
  return (
    <div className="container">
      <div className="row justify-content-between vertical-bar__icon">
        <i className="fas fa-volume-down cursor-pointer"></i>
        <i className="fas fa-cog cursor-pointer"></i>
      </div>
      <div className="row justify-content-center mt-3">
        <img
          src={Images.AVATAR_DEF}
          alt="avatar default"
          className="vertical-bar__avatar-circle"
        />
        <div className="col-12 text-center mt-3">
          <div className="font-weight-bold">{fullName}</div>
          <div>{nickName}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
