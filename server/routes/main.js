import express from "express";

import {
  getUsers,
  registerUser,
  loginUser,
  forgotPassword,
  getCurrentUser,
} from "../controllers/user";

const router = express.Router();

//User
router.get("/users", getUsers);
router.post("/register-user", registerUser);
router.post("/login-user", loginUser);
router.get("/forgot-password", forgotPassword);
router.get("/get-current-user", getCurrentUser);

export default router;
