import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation

function ScorePage() {
  const location = useLocation(); // Use useLocation to access the location object
  const { score, totalQuestions } = location.state || {}; // Extract score and totalQuestions from state, providing an empty object as a fallback

  return (
    <div>
      <h1>Your Score</h1>
      <h3>
        {score}/{totalQuestions}
      </h3>
    </div>
  );
}

export default ScorePage;
