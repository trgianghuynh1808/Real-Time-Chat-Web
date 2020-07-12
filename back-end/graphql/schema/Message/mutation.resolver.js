import Message from "../../../models/Message";

export default {
  Mutation: {
    create_message: async (_, { message, senderMail }) => {
      const newMessage = new Message({ message, senderMail });

      await newMessage.save();

      return newMessage;
    },
  },
};
