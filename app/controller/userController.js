import UserRepository from "../model/repositories/userRepository.js";
import HttpStatus from "../utils/http.js";
import Response from './../domain/reponse.js'
import bcrypt from 'bcryptjs'

export const registerUser = async ( { ...data } ) => {
  // Checks if email 
  const { firstname, lastname, email, password, matric_no } = data
  const filteredData = {
    firstname,
    lastname,
    email,
    password,
    matric_no
  }
  console.log(filteredData)

  // Checks if email exists
  const emailCheck = await UserRepository.readUserDataByEmail(filteredData?.email)
  console.log(emailCheck)
  if (emailCheck) {
    const message = "Email Exists!!!"
    const statusCode = HttpStatus.BAD_REQUEST.code
    const statusMessage = HttpStatus.BAD_REQUEST.status
    return new Response(statusCode, statusMessage, message, {})
  }
  
  // If email doesn't exists
  const register = await UserRepository.createUserData(filteredData)
  const message = "success"
  const statusCode = HttpStatus.CREATED.code
  const statusMessage = HttpStatus.CREATED.status
  return new Response(statusCode, statusMessage, message, register)
};

export const loginUser = async (email, password) => {
  const filteredData = {
    email, password
  }
  if (!filteredData.email || !filteredData.password) {
    const message = "Enter email and Password"
    const statusCode = HttpStatus.BAD_REQUEST.code
    const statusMessage = HttpStatus.BAD_REQUEST.status
    return new Response(statusCode, statusMessage, message, {})
  }
  // Checks if email Exists
  const emailCheck = await UserRepository.readUserDataByEmail(filteredData?.email)
  if (!emailCheck) {
    const message = "Invalid user credentials!!!"
    const statusCode = HttpStatus.BAD_REQUEST.code
    const statusMessage = HttpStatus.BAD_REQUEST.status
    return new Response(statusCode, statusMessage, message, {})
  }
  
  // If email Exists
  const passwordCheck = await bcrypt.compare(filteredData?.password, emailCheck.password)
  if (!passwordCheck) {
    const message = "Invalid password!!!"
    const statusCode = HttpStatus.BAD_REQUEST.code
    const statusMessage = HttpStatus.BAD_REQUEST.status
    return new Response(statusCode, statusMessage, message, {})
  }
  const message = "success"
  const statusCode = HttpStatus.OK.code
  const statusMessage = HttpStatus.OK.status
  return new Response(statusCode, statusMessage, message, emailCheck)
};