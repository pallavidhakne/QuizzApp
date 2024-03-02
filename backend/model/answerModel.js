import mongoose from "mongoose";
const AnswerSchema = mongoose.Schema(
  {
    questionID: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

const answerModel = mongoose.model("answer", AnswerSchema);
export default answerModel;
