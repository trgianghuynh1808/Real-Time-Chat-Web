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
} from "../controllers/user";

import {
  getAllFriends,
  addFriend,
  updateStatusRelationship,
} from "../controllers/relationship";

const router = express.Router();

//User
router.get("/users", getUsers);
router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/forgot-password", forgotPassword);
router.get("/get-current-user", getCurrentUser);
router.post("/update-status-caption", updateStatusCaption);
router.get("/get-info-user", getInfoUser);
router.post("/update-nick-name-user", updateNickNameUser);
router.post("/change-password", changePassword);

//Relationships
router.get("/friends", getAllFriends);
router.get("/add-friend", addFriend);
router.post("/update-status-relationship", updateStatusRelationship);

export default router;
