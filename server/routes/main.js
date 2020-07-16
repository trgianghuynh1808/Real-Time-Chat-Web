import express from "express";

import {
  getUsers,
  registerUser,
  loginUser,
  forgotPassword,
  getCurrentUser,
  updateStatusCaption,
  getInfoUser,
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

//Relationships
router.get("/friends", getAllFriends);
router.get("/add-friend", addFriend);
router.post("/update-status-relationship", updateStatusRelationship);

export default router;
