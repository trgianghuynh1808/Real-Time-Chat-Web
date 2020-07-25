import React, { useState, Fragment } from "react";
import { isEmpty } from "lodash/fp";

import FriendInvitationsPopUp from "./FriendInvitationsPopUp";

const Main = ({
  curDate,
  handleLogOut,
  friendInvitations,
  handleAcceptFriendInvitation,
  handleDeclinedFriendInvitation,
}) => {
  const [openToolTip, setOpenToolTip] = useState(false);

  const handleOpenToolTip = () => setOpenToolTip(true);

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center">
          <div className="col-4">
            <i className="far fa-calendar-alt calender-icon"></i>
            <span className="ml-3">{curDate}</span>
          </div>
          <div className="col-1 d-flex align-items-center">
            <div className="row">
              <div className="d-flex position-relative col-6">
                <FriendInvitationsPopUp
                  trigger={
                    <i
                      className="fas fa-users header__icon  cursor-pointer"
                      onClick={handleOpenToolTip}
                    ></i>
                  }
                  friendInvitations={friendInvitations}
                  handleAcceptFriendInvitation={handleAcceptFriendInvitation}
                  handleDeclinedFriendInvitation={
                    handleDeclinedFriendInvitation
                  }
                />
                {!isEmpty(friendInvitations) && (
                  <span className="badge text-center">
                    {friendInvitations.length}
                  </span>
                )}
              </div>

              <i
                className="fas fa-sign-out-alt header__icon cursor-pointer col-6"
                onClick={handleLogOut}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Main;
