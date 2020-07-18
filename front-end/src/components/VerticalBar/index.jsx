import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash/fp";

import "./style.scss";
import InfoUser from "./components/InfoUser";
import ListItemMenu from "./components/ListItemMenu";
import { MENU_ITEM_LIST } from "constants/global";
import { userAsync } from "features/Login/userSlice";

const VerticalBar = () => {
  const dispatch = useDispatch();
  const curUser = useSelector((state) => state.user);

  useEffect(() => {
    if (isEmpty(curUser)) {
      dispatch(userAsync.fetchCurUser());
    }
  }, [dispatch, curUser]);

  return (
    <div className="vertical-bar">
      <InfoUser
        fullName={curUser.username}
        statusMsg={curUser.status_caption}
      />
      <ListItemMenu menuItems={MENU_ITEM_LIST} />
    </div>
  );
};

export default VerticalBar;
