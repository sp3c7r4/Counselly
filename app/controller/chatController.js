import Chat from "../db/chatModel.js";
import User from "../db/userModel.js"

export const createChat = async (userId, userMessage, modelResponse) => {
  console.log(userId)
  const findUser = await User.findById({_id: userId});
  console.log(findUser)
  if (!findUser) {
    return "User not found"
  }
  
  const createChats = await Chat.findOneAndUpdate(
      { user_id: userId },
      { $push: { history: { user: userMessage, model: modelResponse } } },
      { upsert: true, new: true }
    );
  return createChats
};