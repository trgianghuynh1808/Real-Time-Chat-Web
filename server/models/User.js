import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

import { randomString } from "../utils";

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
  token: { type: String },
  refresh_token: { type: String },
  status_caption: { type: String },
  add_friend_code: { type: String, index: { unique: true } },
  id: { type: String, default: uuidv4(), required: true },
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
  const token = jwt.sign(
    {
      email: this.email,
      username: this.username,
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
      username: this.username,
      expDate: curDate,
    },
    process.env.SECRET,
    {
      expiresIn: process.env.EXPIRED_TOKEN,
    }
  );

  this.token = token;
  this.refresh_token = refreshToken;
};

export default mongoose.model("User", userSchema);
