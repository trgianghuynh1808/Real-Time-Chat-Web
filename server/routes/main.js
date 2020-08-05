import express from "express";

import {
  getUsers,
  registerUser,
  loginUser,
  forgotPassword,
  getCurrentUser,
  updateStatusCaption,
  getInfoUser,
  updateNickNameUser,
  changePassword,
  getUserByFriendCode,
  refreshToken,
  getFriendsOfUser
} from "../controllers/user";

import {
  getAllFriends,
  addFriend,
  updateStatusRelationship,
  getFriendInvitations
} from "../controllers/relationship";

const router = express.Router();

//User
//-GET
router.get("/users", getUsers);
router.get("/get-user-by-friend-code", getUserByFriendCode);
router.get("/get-info-user", getInfoUser);
router.get("/forgot-password", forgotPassword);
router.get("/get-current-user", getCurrentUser);
router.get("/get-friend-of-user", getFriendsOfUser);
//-POST
router.post("/update-status-caption", updateStatusCaption);
router.post("/update-nick-name-user", updateNickNameUser);
router.post("/change-password", changePassword);
router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.post("/refresh-token", refreshToken);

//Relationships
//-GET
router.get("/friends", getAllFriends);
router.get("/add-friend", addFriend);
router.get("/get-friend-invitations", getFriendInvitations);
//-POST
router.post("/update-status-relationship", updateStatusRelationship);

export default router;
