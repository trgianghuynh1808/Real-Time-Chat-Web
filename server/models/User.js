import mongoose from "mongoose";

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
});

export default mongoose.model("User", userSchema);
