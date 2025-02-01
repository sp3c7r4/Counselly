import mongoose from "mongoose";

const connectDB = async(DATABASE_URL) => {
  try {
    await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Database Connected...')
  } catch (err) {
    console.log(err)
  }
}

export default connectDB;