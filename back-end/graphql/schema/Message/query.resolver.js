import Message from "../../../models/Message";

export default {
  Query: {
    get_messages: async () => {
      return await Message.find();
    },
  },
};
