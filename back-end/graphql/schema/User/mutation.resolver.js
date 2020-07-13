import bcrypt from "bcryptjs";

import User from "../../../models/User";
import { validateEmail, validatePassword } from "../../../utils";

export default {
  Mutation: {
    register_user: async (_, { email, username, password }) => {
      if (!validateEmail(email)) throw Error("EMAIL_INVALID");

      if (!validatePassword(password)) throw Error("PASSWORD_INVALID");

      const existsUser = await User.findOne().or([{ username }, { email }]);
      if (existsUser) throw Error("USER_ALREADY_EXISTS");

      const hashPassword = await bcrypt.hashSync(
        password,
        parseInt(process.env.SALT_ROUNDS)
      );
      const newUser = new User({ email, username, password: hashPassword });

      await newUser.save();

      return newUser;
    },
  },
};
