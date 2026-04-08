import mongoose from "mongoose";
import env from "./envConfig.js";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Api Docs : http://localhost:${env.PORT}/api-docs`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
