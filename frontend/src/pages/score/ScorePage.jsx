import React from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom"; // Import useLocation
import "./style.css";
import Quiz from "../quiz/Quiz";
import { Link } from "react-router-dom";

const calculatePercentageMessage = (score, totalQuestions) => {
  const per = (score * 100) / totalQuestions;

  if (per < 35) {
    return "You are Failed";
  } else if (per < 50) {
    return "You are Passed";
  } else if (per > 90) {
    return "You are Passed in A1 Grade";
  } else {
    return "You have Passed";
  }
};
function ScorePage() {
  const location = useLocation(); // Use useLocation to access the location object
  const { score, totalQuestions } = location.state || {}; // Extract score and totalQuestions from state, providing an empty object as a fallback

  const message = calculatePercentageMessage(score, totalQuestions);

  return (
    <div className="container">
      <h1>Your Score</h1>
      <h3>
        {score}/{totalQuestions}
      </h3>
      <p className="msg">{message}</p>
      {message === "You are Failed" && (
        <div>
          <h1>Try again</h1>
          <Link className="start-btn" to="/quiz">
            Start Quiz
          </Link>
        </div>
      )}
    </div>
  );
}

export default ScorePage;
