import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <Link to="/quiz/1">Start Quiz</Link>
    </div>
  );
}

export default Home;
