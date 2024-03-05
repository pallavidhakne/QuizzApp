import express from "express";
import quizModel from "../model/quizModel.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const filePath = path.join(__dirname, "../questionOption.json");
const jsonData = fs.readFileSync(filePath, "utf-8");
const quizData = JSON.parse(jsonData);

router.post("/quizz", async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const result = await quizModel.insertMany(data);
    console.log(`result is ${result}`);
    res.status(200).json({ message: "Quiz Data Uploaded Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error catch" });
  }
});

//get request for fatching data
router.get("/", async (req, res) => {
  try {
    const qData = await quizModel.find({});
    console.log(`the qdata is ${qData}`);
    res.status(200).json(qData);
  } catch (error) {
    console.log(`error in catch block ${error}`);
  }
});

export default router;
