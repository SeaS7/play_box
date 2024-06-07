import dotenv from "dotenv";
import dbConection from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

dbConection()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error : " , error);
      throw error;
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error while connecting Mongo DB ${err}`);
  });
