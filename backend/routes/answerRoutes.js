// answerRoutes.js

import Express from "express";
import AnswerModel from "../model/answerModel.js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const router = Express.Router();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

router.post("/answers", async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../answer.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const answers = JSON.parse(jsonData);
    const result = await AnswerModel.insertMany(answers);
    res
      .status(201)
      .json({ message: "Answer Data Uploaded Successfully answer.routes" });
  } catch (error) {
    console.log("error occur while inserting answers answer.routes");
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const answers = await AnswerModel.find({});
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
