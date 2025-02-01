import express from 'express'
import { config } from 'dotenv'
import connectDB from './db/connectDB'

config()
const app = express()
const PORT = process.env.PORT || 3000

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/movies'

connectDB(DATABASE_URL);
// Routes Definition
app.get('/', (_, res) => {
  res.status(200).send("Server working perfectly!!!")
})

app.get('/prompt', (req, res) => {
})

app.listen(PORT, () => console.log(`Server started on ${PORT}`))