import User from "../../../models/User";

export default {
  Query: {
    get_users: async () => {
      return await User.find();
    },
  },
};
