const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      required: true,
      default: "New Chat",
    },

    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "document",
      required: true,
    },
    messages: [
      {
        role: { type: String, enum: ["user", "assistant"], default: "user" },
        content: String,
        id: mongoose.Schema.Types.ObjectId, // Include _id for each message
      },
    ] ,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Chat", chatSchema)
