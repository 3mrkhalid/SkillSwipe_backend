import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  roomId: String,
  userId: String,
  username: String,
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

messageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

const Message = mongoose.model("Message", messageSchema);

export default Message;