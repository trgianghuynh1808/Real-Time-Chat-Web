import jwt from "jsonwebtoken";

import User from "../models/User";

export const respSuccess = ({ message, data }, res) => {
  return res.status(201).json({
    success: true,
    message,
    data,
  });
};

export const respFailure = ({ message, error = {} }, res) => {
  return res.status(500).json({
    success: false,
    message,
    error: error.message,
  });
};

export const getUserByToken = async (req, res) => {
  const { email } = req.decoded;
  const user = await User.findOne({ email });

  if (!user) return respFailure({ message: "USER_IS_NOT_EXISTS", error }, res);

  return user;
};
