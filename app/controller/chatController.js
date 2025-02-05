import { aiChat } from "../ai.js";
import Chat from "../model/chatModel.js";
import User from "../model/userModel.js";

export const createChat = async (userId, userMessage) => {
  console.log(userId);
  const findUser = await User.findById({ _id: userId });
  console.log(findUser);
  if (!findUser) {
    return "User not found";
  }

  const aiResponse = aiChat(findUser?._id, userMessage)
  return aiResponse;
};

export const getChats = async(userId) => {
  console.log(userId)
  const retrieveChats = Chat.findOne({user_id: userId})
  return retrieveChats
}

// New function to get chat history
export const getChatHistory = async (userId) => {
  const chat = await Chat.findOne({ user_id: userId });
  if (!chat) {
    return [];
  }
  return chat.history;
};