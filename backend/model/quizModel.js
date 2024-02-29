import mongoose from "mongoose";
const quizschema = mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    option: {
      type: [
        {
          type: String,
          required: true,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);
const quizModel = mongoose.model("quiz", quizschema);
export default quizModel;
