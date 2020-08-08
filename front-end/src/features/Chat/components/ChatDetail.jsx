import React, { useState } from "react";

import Images from "constants/images";
import { convertStrToTime } from "utils";

const ChatDetail = ({ converstation, curUser }) => {
  const [curMsg, setCurMsg] = useState("");

  return (
    <div className="chat-detail ">
      <div className="d-flex chat-detail__user ml-3">
        <img
          className="chat-detail__avatar-circle mr-3"
          src={Images.AVATAR_DEF1}
          alt="avatar-def"
        />
        <h4>Hoàng Thượng</h4>
      </div>
      <div className="chat-history">
        {converstation.map((item, index) => {
          if (curUser.id !== item.senderId) {
            return (
              <div className="speech-wrp" key={index}>
                <div className="row align-items-center">
                  <img
                    className="speech-wrp__avatar-circle mr-3"
                    src={Images.AVATAR_DEF1}
                    alt="avatar-def"
                  />
                  <div className="speech dark text-light ">{item.message}</div>
                </div>
                <div className="row ">
                  <div className="ml-5 mt-1 time">
                    {convertStrToTime(item.createdAt)}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              className="speech-wrp d-flex justify-content-end align-items-center"
              key={index}
            >
              <div className="speech blue text-light ">
                {item.message}
                <span className="time time-right">
                  {convertStrToTime(item.createdAt)}
                </span>
              </div>
              <img
                className="speech-wrp__avatar-circle ml-3"
                src={Images.AVATAR_DEF}
                alt="avatar-def"
              />
            </div>
          );
        })}
      </div>
      <div className="chat-box d-flex align-items-center justify-content-between">
        <input
          type="text"
          className="form-control input-msg"
          placeholder="Hãy nói gì đó"
          value={curMsg}
          onChange={e => {
            setCurMsg(e.target.value);
          }}
        />
        <i
          className={`fas fa-paper-plane send-icon cursor-pointer ${
            curMsg.length > 0 ? "send-icon--active" : ""
          }`}
        ></i>
      </div>
    </div>
  );
};

export default ChatDetail;
