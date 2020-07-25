import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

mongoose.Promise = global.Promise;

const relationshipSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: { type: String, default: uuidv4(), required: true },
  user_one_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  user_two_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  status: { type: Number, required: true },
  action_user_id: { type: String, required: true },
});

relationshipSchema.pre("save", async function (next) {
  const relationship = this;

  if (this.isNew) {
    relationship._id = mongoose.Types.ObjectId();
  }

  return next();
});

export default mongoose.model("Relationship", relationshipSchema);
