import express from 'express';
import { getChats, storeChat } from '../controller/chatController.js';
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

router.get("/all", tryCatch(async(req, res) => {
  const getChat = await getChats(req.query.userid)
  res.status(200).send(getChat)
}));

export default router;