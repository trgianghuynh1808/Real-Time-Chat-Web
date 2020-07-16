import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import User from "../models/User";
import { respFailure, respSuccess, authenticationUser } from "../utils/server";
import { validatePassword, generateRandomPassword } from "../utils";

export const getUsers = async (req, res) => {
  return User.find()
    .then((users) => {
      return respSuccess({ message: "GET_USERS_SUCCESS", data: users }, res);
    })
    .catch((error) => {
      return respFailure({ message: "SERVER_ERROR", error }, res);
    });
};

export const registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!validatePassword(password))
    return respFailure({ message: "PASSWORD_INVALID" }, res);

  const existsUser = await User.findOne().or([{ username }, { email }]);
  if (existsUser) return respFailure({ message: "USER_ALREADY_EXISTS" }, res);

  const hashPassword = await bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );
  const newUser = new User({
    _id: mongoose.Types.ObjectId(),
    email,
    username,
    password: hashPassword,
  });

  return newUser
    .save()
    .then((newUser) => {
      return respSuccess({ message: "REGISTER_SUCCESS", data: newUser }, res);
    })
    .catch((error) => {
      return respFailure({ message: "SERVER_ERROR", error }, res);
    });
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return respFailure({ message: "USERNAME_OR_PASSWORD_INVALID" }, res);

  const existsUser = await User.findOne({ username });
  if (!existsUser)
    return respFailure({ message: "USERNAME_IS_NOT_EXISTS" }, res);

  const isValidPassword = await bcrypt.compareSync(
    password,
    existsUser.password
  );
  if (!isValidPassword)
    return respFailure({ message: "PASSWORD_IS_WRONG" }, res);

  const token = jwt.sign(
    {
      email: existsUser.email,
      username: existsUser.username,
    },
    process.env.SECRET,
    {
      expiresIn: process.env.EXPIRED_TOKEN,
    }
  );

  let curDate = new Date();
  curDate.setDate(curDate.getDate() + parseInt(process.env.EXPIRED_TOKEN_DAYS));
  const refreshToken = jwt.sign(
    {
      username: existsUser.username,
      expDate: curDate,
    },
    process.env.SECRET,
    {
      expiresIn: process.env.EXPIRED_TOKEN,
    }
  );

  existsUser.token = token;
  existsUser.refresh_token = refreshToken;
  await existsUser.save();

  return existsUser
    .save()
    .then((user) => {
      return respSuccess({ message: "LOGIN_SUCCESS", data: user }, res);
    })
    .catch((error) => {
      return respFailure({ message: "SERVER_ERROR", error }, res);
    });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.query;

  if (!email) return respFailure({ message: "EMAIL_INVALID" }, res);

  const user = await User.findOne({ email });
  if (!user) return respFailure({ message: "USERNAME_IS_NOT_EXISTS" }, res);
  const newPassword = generateRandomPassword();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });

  const mailOptions = {
    from: process.env.USER_GMAIL,
    to: email,
    subject: "Quên mật khẩu Real time Chat",
    text: `Xin chào, "${user.username}". Đây là password mới "${newPassword}" của bạn.`,
  };

  await transporter.sendMail(mailOptions);

  const hashNewPassword = await bcrypt.hashSync(
    newPassword,
    parseInt(process.env.SALT_ROUNDS)
  );
  user.password = hashNewPassword;

  return user
    .save()
    .then((user) => {
      return respSuccess(
        { message: "FORGOT_PASSWORD_SUCCESS", data: user },
        res
      );
    })
    .catch((error) => {
      return respFailure({ message: "SERVER_ERROR", error }, res);
    });
};

export const getCurrentUser = async (req, res) => {
  try {
    const curUser = await authenticationUser(req, res);

    return respSuccess(
      {
        message: "GET_CURRENT_USER_SUCCESS",
        data: {
          username: curUser.username,
          status_caption: curUser.status_caption,
        },
      },
      res
    );
  } catch (error) {
    return respFailure({ message: "SERVER_ERROR", error }, res);
  }
};

export const updateStatusCaption = async (req, res) => {
  const { statusMsg } = req.body;

  if (!statusMsg)
    return respFailure({ message: "STATUS_CAPTION_INVALID", error }, res);

  const user = await authenticationUser(req, res);

  user.status_caption = statusMsg;

  return user
    .save()
    .then((user) => {
      return respSuccess(
        { message: "UPDATE_STATUS_CAPTION_SUCCESS", data: user },
        res
      );
    })
    .catch((error) => {
      return respFailure({ message: "SERVER_ERROR", error }, res);
    });
};
