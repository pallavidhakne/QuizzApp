import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId, // Using ObjectId for references
      required: true,
      ref: "quiz",
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AnswerModel = mongoose.model("Answer", AnswerSchema);

export default AnswerModel;
