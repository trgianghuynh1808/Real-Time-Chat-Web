import React, { useState, Fragment } from "react";
import { isEmpty } from "lodash/fp";
import { isMobile } from "react-device-detect";

import FriendInvitationsPopUp from "./FriendInvitationsPopUp";

const Main = ({
  curDate,
  handleLogOut,
  friendInvitations,
  handleAcceptFriendInvitation,
  handleDeclinedFriendInvitation,
  handleGotoChatPage,
  handleGoToProfilePage
}) => {
  const [, setOpenToolTip] = useState(false);

  const handleOpenToolTip = () => setOpenToolTip(true);

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row justify-content-between align-items-center">
          <div className="col-4 col-md-4">
            <i className="far fa-calendar-alt calender-icon"></i>
            <span className="ml-3">{curDate}</span>
          </div>
          <div className="col-6 col-md-1 col-lg-2 ">
            <div className="row justify-content-end">
              <div className="d-flex position-relative col-10 col-md-11 ">
                {isMobile && (
                  <Fragment>
                    <i
                      className="far fa-id-badge header__icon cursor-pointer mr-3"
                      onClick={handleGoToProfilePage}
                    ></i>
                    <i
                      className="far fa-comment-dots header__icon cursor-pointer mr-3"
                      onClick={handleGotoChatPage}
                    ></i>
                  </Fragment>
                )}
                <FriendInvitationsPopUp
                  trigger={
                    <i
                      className="fas fa-users header__icon  cursor-pointer mr-3"
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

                <i
                  className="fas fa-sign-out-alt header__icon cursor-pointer "
                  onClick={handleLogOut}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Main;
