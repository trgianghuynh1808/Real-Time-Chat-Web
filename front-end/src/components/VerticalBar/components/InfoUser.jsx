import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Emojione } from "react-emoji-render";

import Images from "constants/images";
import { doFunctionWithEnter } from "utils";
import { updateStatusCaption } from "features/Login/userSlice";

const InfoUser = ({ user }) => {
  const [updateStatusMsg, setUpdateStatusMsg] = useState(false);
  const [curStatusMsg, setCurStatusMsg] = useState("");
  const dispatch = useDispatch();

  const { username, status_caption: statusMsg, nick_name: nickName } = user;

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
          <div className="font-weight-bold">{nickName || username}</div>
          {!updateStatusMsg ? (
            <div
              className="mt-2 cursor-pointer"
              onClick={() => setUpdateStatusMsg(true)}
            >
              {statusMsg ? <Emojione text={statusMsg} /> : "Chưa có trạng thái"}
            </div>
          ) : (
            <div className="input-group input-group-sm mt-2">
              <input
                type="text"
                className="form-control py-2 border-right-0 border"
                placeholder="Nhập cảm xúc của bạn."
                value={curStatusMsg}
                onChange={(event) => {
                  setCurStatusMsg(event.target.value);
                }}
                onKeyPress={(event) => {
                  doFunctionWithEnter(event, () => {
                    if (curStatusMsg) {
                      dispatch(updateStatusCaption(curStatusMsg));

                      setUpdateStatusMsg(false);
                      setCurStatusMsg("");
                    }
                  });
                }}
              />
              <span className="input-group-append cursor-pointer">
                <button
                  className="btn btn-outline-secondary border-left-0 border"
                  type="button"
                  onClick={() => {
                    setCurStatusMsg("");
                    setUpdateStatusMsg(false);
                  }}
                >
                  <i className="fas fa-times"></i>
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoUser;
