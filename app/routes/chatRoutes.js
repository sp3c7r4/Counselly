import express from 'express';
import { getChatByID, getChats, storeChat } from '../controller/chatController.js';
import tryCatch from '../utils/tryCatch.js';

const router = express.Router()

router.post("/start", tryCatch(async (req, res) => {
  const createChats = await storeChat(
    req.body.userId,
    req.body.chatId,
    req.body.userMessage
  );
  console.log(createChats)
  res.status(createChats.statusCode).send(createChats)
}));

router.get("/all/:userid", tryCatch(async(req, res) => {
  const getChat = await getChats(req.params.userid)
  res.status(200).send(getChat)
}));

router.get("/fetch/:chatId", tryCatch(async(req, res) => {
  const getChat = await getChatByID(req.params.chatId)
  res.status(200).send(getChat)
}));

export default router;