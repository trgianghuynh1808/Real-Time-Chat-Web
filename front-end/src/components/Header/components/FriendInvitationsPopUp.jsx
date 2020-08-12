import React from "react";
import Popup from "reactjs-popup";
import { isEmpty } from "lodash/fp";
import { isMobile } from "react-device-detect";

import Images from "constants/images";

const FriendInvitationsPopUp = ({
  trigger,
  friendInvitations,
  handleAcceptFriendInvitation,
  handleDeclinedFriendInvitation
}) => {
  return (
    <Popup
      trigger={trigger}
      closeOnDocumentClick={true}
      closeOnEscape={true}
      position="bottom center"
      contentStyle={isMobile ? { width: "100%" } : {}}
    >
      <div className="container p-2">
        {isEmpty(friendInvitations) ? (
          <div className="text-center">Không có lời mời kết bạn</div>
        ) : (
          friendInvitations.map((friendInvitation, index) => {
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
                  <i
                    className="fas fa-check text-success cursor-pointer"
                    onClick={() => {
                      handleAcceptFriendInvitation(
                        friendInvitation.relationshipId
                      );
                    }}
                  ></i>
                </div>
                <div className="col-2">
                  <i
                    className="fas fa-times text-danger cursor-pointer"
                    onClick={() => {
                      handleDeclinedFriendInvitation(
                        friendInvitation.relationshipId
                      );
                    }}
                  ></i>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Popup>
  );
};

export default FriendInvitationsPopUp;
