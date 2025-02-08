import express from "express";
import { config } from "dotenv";
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import connectDB from "./utils/connectDB.js";
import logger from './utils/logger.js'
import ip from 'ip'
import errorHandler from "./routes/middlewares/errorMiddleware.js";

config();
const app = express();
const PORT = process.env.PORT || 3000;

const DATABASE_URL = process.env.DATABASE_URL;

connectDB(DATABASE_URL);

app.use(express.json());

// user Routes
app.use('/user', userRoutes)

// chatRoutes
app.use('/chat', chatRoutes)

// Home Routes
app.get("/", (_, res) => {
  res.status(200).send("Server working perfectly!!!");
});

app.use(errorHandler)

app.listen(PORT, () => {
  logger.info(`Server running on: ${ip.address()}:${PORT}`)
  console.log(`Server started on ${PORT}`)
});
