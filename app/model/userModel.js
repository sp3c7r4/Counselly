import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  matric_no: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true})


const User = mongoose.model('User', userSchema);
export default User;