import React from "react";
import Popup from "reactjs-popup";

import Images from "constants/images";

const FriendInvitationsPopUp = ({ trigger, friendInvitations }) => {
  console.log("test data", friendInvitations);
  return (
    <Popup
      trigger={trigger}
      closeOnDocumentClick={true}
      closeOnEscape={true}
      position="bottom center"
    >
      <div className="container p-2">
        {friendInvitations.map((friendInvitation, index) => {
          return (
            <div className="row" key={index}>
              <div className="col-2">
                <img
                  src={Images.AVATAR_DEF}
                  alt="avatar"
                  className="avatar-circle"
                />
              </div>
              <div className="col-5">
                {friendInvitation.nickname || friendInvitation.username}
              </div>
              <div className="col-2">
                <i className="fas fa-check text-success cursor-pointer"></i>
              </div>
              <div className="col-2">
                <i className="fas fa-times text-danger cursor-pointer"></i>
              </div>
            </div>
          );
        })}
      </div>
    </Popup>
  );
};

export default FriendInvitationsPopUp;
