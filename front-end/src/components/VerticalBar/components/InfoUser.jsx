import React, { useState } from "react";

import Images from "constants/images";
import { doFunctionWithEnter } from "utils";

const InfoUser = ({ fullName, statusMsg, fetchUpdateStatusCaption }) => {
  const [updateStatusMsg, setUpdateStatusMsg] = useState(false);
  const [curStatusMsg, setCurStatusMsg] = useState("");
  const [statusMsgState, setStatusMsgState] = useState(statusMsg);

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
          {!updateStatusMsg ? (
            <div
              className="mt-2 cursor-pointer"
              onClick={() => setUpdateStatusMsg(true)}
            >
              {statusMsgState ? statusMsgState : "Chưa có trạng thái"}
            </div>
          ) : (
            <div className="input-group input-group-sm mt-2">
              <input
                type="text"
                className="form-control "
                placeholder="Nhập cảm xúc của bạn."
                value={curStatusMsg}
                onChange={(event) => {
                  setCurStatusMsg(event.target.value);
                }}
                onKeyPress={(event) => {
                  doFunctionWithEnter(event, () => {
                    fetchUpdateStatusCaption(curStatusMsg);
                    setStatusMsgState(curStatusMsg);
                    setUpdateStatusMsg(false);
                    setCurStatusMsg("");
                  });
                }}
              />
              <div
                className="input-group-append cursor-pointer"
                onClick={() => {
                  setCurStatusMsg("");
                  setUpdateStatusMsg(false);
                }}
              >
                <span className="input-group-text text-danger">x</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
