import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import fs from "fs";

// Router files
import userRoutes from "./routes/userRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
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
