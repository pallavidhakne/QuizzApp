import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
import path from "path";
//model
import quizModel from "./model/quizModel.js";
// Router files
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();
async function uploadData() {
  try {
    const data = await fs.promises.readFile("./questionOption.json", "utf8");
    const jsonData = JSON.parse(data);
    //insert over each object in the json array and insert it into the database
    for (const item of jsonData) {
      const { question, options } = item;
      //create new doc using quizmodel schema
      const newQuiz = new quizModel({
        question,
        option: options,
      });
      await newQuiz.save();
    }
    console.log("Data inserted successfully");
  } catch (err) {
    console.error("Error uploading data to the database", err);
    throw err;
  }
}
// async function uploadData() {
//   try {
//     //read data from json file and uploading it to the mongodb
//     const data = await fs.promises.readFile("./questionOption.json", "utf8");
//     const jsonData = JSON.parse(data);
//     await quizModel.insertMany(jsonData);
//     console.log("data Inserted successfully");
//   } catch (err) {
//     console.error("Error uploading data to the database", err);
//     throw err;
//   }
// }
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");

    const existingData = await quizModel.find({});
    if (existingData.length === 0) {
      // Upload data if the database is empty
      await uploadData();
    } else {
      console.log("Data already exists in the database. Skipping insertion.");
    }
  } catch (err) {
    console.error("Error connecting to the database", err);
    throw err;
  }
})();

const app = express();
const port = process.env.PORT || 3000;

// Middleware for CORS should be used before defining routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json()); // Body parsing middleware

// Routes
app.use("/api/user", userRoutes);
app.use("/api/quizz", quizRoutes);

app.get("/", (req, res) => {
  res.send("Hellooooo");
});

// Server listen
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
