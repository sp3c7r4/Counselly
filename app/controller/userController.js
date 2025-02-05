import User from "../model/userModel.js";

export const registerUser = async (name, email, password) => {
  const register = await User.create({ name, email, password });
  return register
};