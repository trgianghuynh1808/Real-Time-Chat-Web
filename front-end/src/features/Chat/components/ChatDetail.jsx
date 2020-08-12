import React, { useState, useEffect } from "react";
import { isEmpty } from "lodash/fp";
import { Emojione } from "react-emoji-render";

import Images from "constants/images";
import { convertStrToTime, doFunctionWithEnter } from "utils";

const ChatDetail = ({
  converstation,
  curUser,
  handleSendMessage,
  curFriend
}) => {
  const [curMsg, setCurMsg] = useState("");

  useEffect(() => {
    const chatHistoryEle = document.getElementById("last-msg");
    if (chatHistoryEle) {
      chatHistoryEle.scrollIntoView(true);
    }
  });

  return (
    <div className="chat-detail ">
      <div className="d-flex chat-detail__user ml-3">
        <img
          className="chat-detail__avatar-circle mr-3"
          src={Images.AVATAR_DEF1}
          alt="avatar-def"
        />
        <h4>{curFriend.nick_name || curFriend.username}</h4>
      </div>
      <div className="chat-history" id="chat-history">
        {isEmpty(converstation) ? (
          <div className="text-center">Hãy trò chuyện cùng nhau</div>
        ) : (
          converstation.map((item, index) => {
            if (curUser.id !== item.senderId) {
              return (
                <div
                  className="speech-wrp "
                  key={index}
                  id={converstation.length - 1 === index ? "last-msg" : ""}
                >
                  <div className="row align-items-center">
                    <img
                      className="speech-wrp__avatar-circle mr-3"
                      src={Images.AVATAR_DEF1}
                      alt="avatar-def"
                    />
                    <div className="speech dark text-light ">
                      <Emojione text={item.message} />
                    </div>
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
                className="speech-wrp d-flex justify-content-end align-items-center "
                key={index}
                id={converstation.length - 1 === index ? "last-msg" : ""}
              >
                <div className="speech blue text-light ">
                  <Emojione text={item.message} />
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
          })
        )}
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
          onKeyPress={e => {
            doFunctionWithEnter(e, () => {
              if (curMsg.length > 0) {
                handleSendMessage(curMsg);
                setCurMsg("");
              }
            });
          }}
        />
        <i
          className={`fas fa-paper-plane send-icon cursor-pointer ${
            curMsg.length > 0 ? "send-icon--active" : ""
          }`}
          onClick={() => {
            if (curMsg.length > 0) {
              handleSendMessage(curMsg);
              setCurMsg("");
            }
          }}
        ></i>
      </div>
    </div>
  );
};

export default ChatDetail;
