import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
function Home() {
  return (
    <div className="home-page">
      <h1>Welcome to the Quiz App!</h1>
      <p>Test your knowledge with our exciting quiz challenges.</p>
      <Link className="start-btn" to="/quiz">
        Start Quiz
      </Link>
    </div>
  );
}

export default Home;
