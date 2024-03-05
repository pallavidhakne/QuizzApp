import { Express } from "express";
import answerModel from "../model/answerModel";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

//storing answers
const router = Express.Router();
router.post("/answer", async (req, res) => {
  try {
    const { questionId, answer } = req.body;
    const newAnswer = await answerModel.create({ questionId, answer });
    res.status(201).json(newAnswer);
  } catch (error) {
    console.log("error occurs while posting answers data");
  }
});
