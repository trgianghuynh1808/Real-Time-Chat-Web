import User from "../../../models/User";

export default {
  Mutation: {
    register_user: async (_, { email, username }) => {
      const newUser = new User({ email, username });

      await newUser.save();

      return newUser;
    },
  },
};
