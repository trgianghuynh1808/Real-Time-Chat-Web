import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { isEmpty } from "lodash/fp";

import ChatDetail from "../components/ChatDetail";
import { messageAsync, createMessage } from "../converstationSlice";

const scrollToBottom = () => {
  const chatHistoryEle = document.getElementById("last-msg");
  chatHistoryEle.scrollIntoView(true);
};

const MainPage = () => {
  const socket = io(process.env.REACT_APP_WS_SERVER_URL);
  const dispatch = useDispatch();
  const converstation = useSelector(state => state.converstation);
  const curUser = useSelector(state => state.user);
  const curFriend = useSelector(state => state.curFriend);

  useEffect(() => {
    if (!isEmpty(curFriend)) {
      dispatch(messageAsync.fetchConverstation(curFriend.relationship_id));
    }
  }, [dispatch, curFriend]);

  useEffect(() => {
    socket.on("showMessage", newMsg => {
      dispatch(createMessage(newMsg));
    });

    return () => {
      socket.off("showMessage");
    };
  });

  const handleSendMessage = message => {
    dispatch(
      messageAsync.fetchCreateMessage({
        relationshipId: curFriend.relationship_id,
        message
      })
    );
    scrollToBottom();
  };

  return (
    <div className="">
      {isEmpty(curFriend) ? (
        <div className="nothing-converstation text-center">
          Hãy chọn một người bạn để trò chuyện nào :D
        </div>
      ) : (
        <ChatDetail
          converstation={converstation}
          curUser={curUser}
          handleSendMessage={handleSendMessage}
          curFriend={curFriend}
        />
      )}
    </div>
  );
};

export default MainPage;
