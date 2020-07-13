import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import User from "../../../models/User";
import { validateEmail, generateRandomPassword } from "../../../utils";

export default {
  Query: {
    get_users: async () => {
      return await User.find();
    },
    login_user: async (_, { username, password }) => {
      if (!username || !password) throw Error("USERNAME_OR_PASSWORD_INVALID");

      const existsUser = await User.findOne({ username });
      if (!existsUser) throw Error("USERNAME_IS_NOT_EXISTS");

      const isValidPassword = await bcrypt.compareSync(
        password,
        existsUser.password
      );
      if (!isValidPassword) throw Error("PASSWORD_IS_WRONG");

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
      existsUser.token = token;
      await existsUser.save();

      return existsUser;
    },
    forgot_password: async (_, { email }) => {
      if (!email || !validateEmail(email)) throw Error("EMAIL_INVALID");

      const user = await User.findOne({ email });
      if (!user) throw Error("USER_NOT_EXISTS");
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
        subject: "Forgot Password Real time Chat",
        text: `Hi, ${user.username}. This is new password "${newPassword}"`,
      };

      await transporter.sendMail(mailOptions);

      const hashNewPassword = await bcrypt.hashSync(
        newPassword,
        parseInt(process.env.SALT_ROUNDS)
      );
      user.password = hashNewPassword;
      await user.save();

      return user;
    },
  },
};
