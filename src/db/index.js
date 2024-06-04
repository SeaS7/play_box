import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";

const dbConection = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );

    console.log(`Database connected to ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Error connecting to database");
    process.exit(1);
  }
};


export default dbConection;