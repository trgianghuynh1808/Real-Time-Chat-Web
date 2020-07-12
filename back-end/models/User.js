import mongoose from "mongoose";

const User = mongoose.model("User", {
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: { unique: true },
  },
});

export default User;
