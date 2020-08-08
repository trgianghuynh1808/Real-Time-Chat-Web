import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const messageSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    sender_id: {
      type: String,
      required: true
    },
    relationship_id: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

messageSchema.pre("save", async function(next) {
  const message = this;

  if (this.isNew) {
    message._id = mongoose.Types.ObjectId();
  }

  return next();
});

export default mongoose.model("Message", messageSchema);
