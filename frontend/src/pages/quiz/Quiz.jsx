import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./quiz.css";
import ScorePage from "../score/ScorePage";

function Quiz() {
  const navigate = useNavigate();
  const [quizData, setquizData] = useState([]);
  //to handle only display certain number of questions
  const questionsperPage = 5;
  const [currPage, setcurrPage] = useState(1);
  //to handle score count
  const [currScore, setCurrScore] = useState(0);
  //for single correct answer selection
  const [selectedOption, setSelectedOption] = useState({});
  const handleOptionChange = (questionIndex, value) => {
    setSelectedOption((prevState) => ({
      ...prevState,
      [questionIndex]: value,
    }));
  };
  //total pages
  const totalPage = Math.ceil(quizData.length / questionsperPage);
  // Calculate the index of the first and last question on the current page
  const indexofLastQuestion = currPage * questionsperPage;
  const indexofFirstQuestion = indexofLastQuestion - questionsperPage;
  // Extract questions for the current page
  const currPageQuestions = quizData.slice(
    indexofFirstQuestion,
    indexofLastQuestion
  );
  //function for change page
  const gotoNextPage = () => {
    if (currPage < totalPage) {
      setcurrPage(currPage + 1);
    }
  };
  const gotoPrevPage = () => {
    if (currPage > 1) {
      setcurrPage(currPage - 1);
    }
  };

  useEffect(() => {
    const fatchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/quizz");
        setquizData(response.data);
      } catch (error) {
        console.log("Error occurs while fatching data : ", error);
      }
    };
    fatchData();
  }, []); // Empty dependency array means this effect runs once on mount (ekbar hi run hoga)

  // Function to clear the selected option for a specific question
  const ClearSelectedOption = (questionIndex) => {
    setSelectedOption((prevState) => {
      const newstate = { ...prevState };
      delete newstate[questionIndex];
      return newstate;
    });
  };
  //for count score
  // const countScore = () => {
  //   let score = 0;
  //   quizData.forEach((question, index) => {
  //     const userSelectedOption = selectedOption[index + 1];
  //     if (userSelectedOption === question.answer) {
  //       score++;
  //     }
  //   });
  //   setCurrScore(score);
  // };
  //handle submit button
  const handleScoreSubmit = () => {
    //countScore();
    let score = 0;
    quizData.forEach((question, index) => {
      const userSelectedOption = selectedOption[index + 1];
      if (userSelectedOption === question.answer) {
        score++;
      }
    });
    // Navigate to the ScoreComponent and pass the score and totalQuestions as props
    navigate("/score", {
      state: { score: score, totalQuestions: quizData.length },
    });
  };
  return (
    <div className="quizpage">
      <h1 className="quiz-title">Quiz Problems</h1>
      {currPageQuestions.map((question, index) => {
        const questionIndex = indexofFirstQuestion + index + 1;
        // Assign key to the first div inside map
        return (
          <div key={`question-${questionIndex}`} className="card">
            <h3 className="question">
              Q{questionIndex}. {question.question}
            </h3>
            {question.option.map((data, optionIndex) => (
              // Ensure options have unique keys by combining questionIndex with optionIndex
              <label
                className="option"
                key={`option-${questionIndex}-${optionIndex}`}
              >
                <input
                  type="radio"
                  name={`quizOption_${questionIndex}`}
                  className="radio-input"
                  value={data}
                  checked={selectedOption[questionIndex] === data}
                  onChange={() => handleOptionChange(questionIndex, data)}
                />
                {data}
              </label>
            ))}
            <button
              className="clear-btn"
              onClick={() => ClearSelectedOption(questionIndex)}
            >
              Clear
            </button>
          </div>
        );
      })}
      {/* prev and next pages handing  */}
      <div className="page-change">
        <button className="btn" onClick={gotoPrevPage} disabled={currPage == 1}>
          Prev
        </button>
        <button
          className="btn"
          onClick={gotoNextPage}
          disabled={currPage == totalPage}
        >
          Next
        </button>
        <button
          className="submit-btn"
          hidden={currPage !== totalPage}
          onClick={handleScoreSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
export default Quiz;
