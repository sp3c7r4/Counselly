import express from 'express'
import { loginUser, registerUser } from '../controller/userController.js';
import tryCatch from '../utils/tryCatch.js';

const router = express.Router()

router.post("/register", tryCatch(async (req, res) => {
  // const { firstname, lastname, email, password, matric_no } = req.body
  const register = await registerUser(req.body)
  res.status(register.statusCode).send(register)
}));

router.post("/login", tryCatch(async (req, res) => {
  const login = await loginUser(req.body.email, req.body.password)
  res.status(login.statusCode).send(login)
}));


export default router;