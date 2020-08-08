import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import ChatDetail from "../components/ChatDetail";
import { messageAsync } from "../converstationSlice";

import { isEmpty } from "lodash/fp";

const MainPage = () => {
  const dispatch = useDispatch();
  const converstation = useSelector(state => state.converstation);
  const curUser = useSelector(state => state.user);

  useEffect(() => {
    const tempRelationshipId = "c02645bc-3c92-4add-988a-0c90075030b8";

    dispatch(messageAsync.fetchConverstation(tempRelationshipId));
  }, [dispatch]);

  if (isEmpty(converstation)) return <Fragment />;

  return (
    <div>
      <ChatDetail converstation={converstation} curUser={curUser} />
    </div>
  );
};

export default MainPage;
