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

export const authenticationUser = async (req, res) => {
  const { authorization: token } = req.headers;
  const tokenFormatted = token.split(" ")[1];

  try {
    const { email } = jwt.verify(tokenFormatted, process.env.SECRET);

    return await User.findOne({ email });
  } catch (error) {
    return respFailure({ message: "NOT_AUTHENTICATION", error }, res);
  }
};
