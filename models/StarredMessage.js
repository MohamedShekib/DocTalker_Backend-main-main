const mongoose = require("mongoose");


const starredMessageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat.messages",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StarredMessage", starredMessageSchema);
