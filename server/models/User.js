import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { _ } from "lodash";

import { randomString, convertSecondsToDays } from "../utils";
import { authConfig } from "../config";

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: { type: String, required: true },
  refresh_token: { type: String },
  status_caption: { type: String },
  add_friend_code: { type: String, index: { unique: true } },
  id: { type: String, default: uuidv4(), required: true },
  nick_name: { type: String },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (this.isModified("password") || this.isNew) {
    const hashPassword = await bcrypt.hashSync(
      user.password,
      parseInt(process.env.SALT_ROUNDS)
    );

    user.password = hashPassword;
  }

  if (this.isNew) {
    user._id = mongoose.Types.ObjectId();
    user.username = user.username.toLowerCase();
    user.add_friend_code = randomString(8);
  }

  return next();
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compareSync(password, this.password);
  } catch (err) {
    return err;
  }
};

userSchema.methods.sendMailForgotPassword = async function (newPassword) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.PASSWORD_GMAIL,
    },
  });

  const mailOptions = {
    from: process.env.USER_GMAIL,
    to: this.email,
    subject: "Quên mật khẩu Real time Chat",
    text: `Xin chào, "${this.username}". Đây là password mới "${newPassword}" của bạn.`,
  };

  await transporter.sendMail(mailOptions);
};

userSchema.methods.generateTokens = function () {
  const user = {
    email: this.email,
    username: this.username,
  };

  const token = jwt.sign(user, authConfig.tokenSecret, {
    expiresIn: authConfig.tokenLife,
  });

  let curDate = new Date();
  curDate.setDate(
    curDate.getDate() + convertSecondsToDays(authConfig.refreshTokenLife)
  );
  const refreshToken = jwt.sign(
    {
      ...user,
      expDate: curDate,
    },
    authConfig.refreshTokenSecret,
    {
      expiresIn: authConfig.refreshTokenLife,
    }
  );

  this.refresh_token = refreshToken;

  return { token, refresh_token: refreshToken };
};

userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

userSchema.methods.filterAtr = function (
  filterArr = ["token", "refresh_token", "password", "_id"]
) {
  return _.omit(this.toObject(), filterArr);
};

export default mongoose.model("User", userSchema);
