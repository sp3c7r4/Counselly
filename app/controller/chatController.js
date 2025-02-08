import Chat from "../model/chatModel.js";
import chatResource from "../model/resources/chatResource.js";
import User from "../model/userModel.js";
import AiClass from '../utils/aiClass.js'
import HttpStatus from "../utils/http.js";
import Response from '../domain/reponse.js'

export const storeChat = async (userId, chatId=null, userMessage) => {
  console.log(userId, userMessage)
  const findUser = await User.findById({ _id: userId });
  console.log(findUser);
  if (!findUser) {
    const message = "user not found!!!"
    const statusCode = HttpStatus.BAD_REQUEST.code
    const statusMessage = HttpStatus.BAD_REQUEST.status
    return new Response(statusCode, statusMessage, message, {})
  }
  const aiChatInstance = new AiClass(userId, chatId, userMessage)
  const initializeAiChat = await aiChatInstance.initializeAiChat()
  console.log("SP3C7R4: ", initializeAiChat)
  const aiResponse = initializeAiChat
  console.log(initializeAiChat, aiResponse)
  const message = "Chat message!!!"
  const statusCode = HttpStatus.OK.code
  const statusMessage = HttpStatus.OK.status
  return new Response(statusCode, statusMessage, message, initializeAiChat)
};

export const getChats = async(userId) => {
  console.log(userId)
  const fetchAllChats = await ChatRepository.readAllChatDataByID(userId)
  return fetchAllChats;
}