import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import fs from "fs";
//model
import quizModel from "./model/quizModel.js";
// Router files
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
dotenv.config();
let lastModifiedTime = null;
let uploadedQuestions = []; //keep track of uploaded data

async function uploadData() {
  try {
    const stats = await fs.promises.stat("./questionOption.json");
    const currentModifiedTime = stats.mtime.toISOString();
    if (lastModifiedTime === null || currentModifiedTime > lastModifiedTime) {
      const data = await fs.promises.readFile("./questionOption.json", "utf-8");
      const jsonData = JSON.parse(data);
      //Insert only new data
      for (const item of jsonData) {
        const { question, options, answer } = item;
        if (!uploadedQuestions.includes(question)) {
          const existingQuiz = await quizModel.findOne({ question });
          if (!existingQuiz) {
            const newQuizdata = new quizModel({
              question,
              option: options,
              answer,
            });
            await newQuizdata.save();
            uploadedQuestions.push(question); // Add the uploaded question to the list
            console.log("new Data inserted successfully:", question);
          }
        }
      }
      lastModifiedTime = currentModifiedTime;
      console.log("Data insertion process completed");
    } else {
      console.log("No new data to insert");
    }
  } catch (err) {
    console.error("Error uploading data to the database", err);
    throw err;
  }
}
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
    //const watcher = chokidar.watch("./questionOption.json");
    //watcher.on("change", async (path) => {
    // console.log(`File ${path} have been changed`);
    // console.log(`Last Modified Time: ${lastModifiedTime}`);
    await uploadData(); // Trigger data insertion on file change
    //});
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
//app.use("/api/answers", answerRoutes);

app.get("/", (req, res) => {
  res.send("Hellooooo");
});

// Server listen
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
