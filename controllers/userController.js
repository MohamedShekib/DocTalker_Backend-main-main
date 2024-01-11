// userController.js
const User = require("../models/user");
const StarredMessage = require("../models/StarredMessage");
const Chat = require("../models/chat");
const mongoose = require("mongoose");


// exports.getUser = async (req, res) => {
//   try {
//     const { _id: id } = req.user;
//     const user = await User.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     res.status(200).json({ ...user._doc, password: undefined });
//   } catch (error) {
//     console.error("Get User Error:", error);
//     res.status(500).json({ error: "Unexpected error while fetching user." });
//   }
// };

exports.updateUser = async (req, res) => {
  try {
    const { _id: id } = req.user;
    const { firstName, lastName } = req.body;

    await User.findByIdAndUpdate(id, { firstName, lastName });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ error: "Unexpected error during user update." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { _id: id } = req.user;

    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ error: "Unexpected error during user deletion." });
  }
};


// Starred Messages Functionality
exports.starMessage = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const messageId = req.params.messageId;
    const { chatId } = req.body;

    // Check if the user and message exist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the chat exists
    const chatExist = await Chat.findById(chatId);
    if (!chatExist) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    // Check if the message exists in the chat
    const messageExists = chatExist.messages.some((message) => message.id == messageId);
    if (!messageExists) {
      return res.status(404).json({ message: 'Message not found in the chat' });
    }

    const isStarred = user.starredMessages.includes(messageId);
    if (isStarred) {
      return res.status(400).json({ message: 'Message is already starred' });
    }

    // Create a new StarredMessage document with a valid messageId
    const starredMessage = await StarredMessage.create({
      userId,
      messageId : new mongoose.Types.ObjectId(messageId) // Ensure messageId is a valid ObjectId
    });

    // Add the ID of the starred message to the user's starredMessages array
    user.starredMessages.push(starredMessage._id);

    // Save the user with the updated starredMessages array
    await user.save();

    return res.status(200).json({ message: 'Message starred successfully' });

    } catch (error) {
      console.error('Star Message Error:', error);
      res.status(500).json({ error: 'Unexpected error while starring message' });
    }
};

