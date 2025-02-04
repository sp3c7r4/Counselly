import express from 'express'
import { config } from 'dotenv'
import connectDB from './db/connectDB.js'
import User from './db/userModel.js'
import Chat from './db/chatModel.js'
import { createChat } from './controller/chatController.js'

config()
const app = express()
const PORT = process.env.PORT || 3000

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/counselly'

connectDB(DATABASE_URL);

app.use(express.json())
// Routes Definition
app.get('/', (_, res) => {
  res.status(200).send("Server working perfectly!!!")
})

app.get('/register', async (req, res) => {
  const register = await User.create({name: "Spectra gee", email: "spectragee@gmail.com", password: "Spectras"})
  res.status(201).send(register)
})
app.post('/prompt', async (req, res) => {
  const createChats = await createChat(req.body.id, req.body.user, req.body.model )
  res.status(201).send(createChats)
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`))