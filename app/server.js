import express from "express";
import { config } from "dotenv";
import connectDB from "./db/connectDB.js";
import User from "./model/userModel.js";
import Chat from "./model/chatModel.js";
import { createChat, getChats } from "./controller/chatController.js";
import { registerUser } from "./controller/userController.js";

config();
const app = express();
const PORT = process.env.PORT || 3000;

const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/counselly";

connectDB(DATABASE_URL);

app.use(express.json());
// Routes Definition
app.get("/", (_, res) => {
  res.status(200).send("Server working perfectly!!!");
});

app.post("/register", async (req, res) => {
  const register = await registerUser(req.body.name, req.body.email, req.body.password)
  res.status(201).send(register)
});
app.post("/prompt", async (req, res) => {
  const createChats = await createChat(
    req.body.id,
    req.body.chat
  );
  res.status(201).send(createChats);
});

app.get("/chat", async(req, res) => {
  console.log(req.query)
  const getChat = await getChats(req.query.userid)
  res.status(200).send(getChat)
})
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
