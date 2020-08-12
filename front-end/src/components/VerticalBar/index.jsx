import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash/fp";

import "./style.scss";
import InfoUser from "./components/InfoUser";
import ListItemMenu from "./components/ListItemMenu";
import { MENU_ITEM_LIST } from "constants/global";
import { userAsync } from "features/Login/userSlice";
import { clearConverstationStore } from "features/Chat/converstationSlice";
import { clearCurFriendStore } from "components/FriendList/curFriendSlice";

const VerticalBar = () => {
  const dispatch = useDispatch();
  const curUser = useSelector(state => state.user);

  useEffect(() => {
    if (isEmpty(curUser)) {
      dispatch(userAsync.fetchCurUser());
    }
  }, [dispatch, curUser]);

  const handleClearStore = () => {
    dispatch(clearConverstationStore());
    dispatch(clearCurFriendStore());
  };

  return (
    <div className="vertical-bar">
      <InfoUser user={curUser} />
      <ListItemMenu
        menuItems={MENU_ITEM_LIST}
        handleClearStore={handleClearStore}
      />
    </div>
  );
};

export default VerticalBar;
