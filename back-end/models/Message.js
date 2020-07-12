import mongoose from "mongoose";

const Message = mongoose.model("Message", {
  message: String,
  senderMail: String,
});

export default Message;
