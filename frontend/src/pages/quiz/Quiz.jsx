import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./quiz.css";
function Quiz() {
  const [quizData, setquizData] = useState([]);
  //to handle only display certain number of questions
  const questionsperPage = 5;
  const [currPage, setcurrPage] = useState(1);

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
  return (
    <div className="quizpage">
      <h1 className="quiz-title">Quiz Problems</h1>
      {/* Rendering our quiz data here */}
      {currPageQuestions.map((question, index) => {
        const questionIndex = indexofFirstQuestion + index + 1;
        return (
          <div>
            <div className="card" key={index}>
              <h3 className="question">
                Q {questionIndex}. {question.question}
              </h3>
              {question.option.map((data, optionind) => (
                <label
                  className="option"
                  key={optionind}
                  className="label-spacing"
                >
                  <input
                    type="radio"
                    name={`quizOption_${questionIndex}`} // same name radio button belong to same group so if we have to handle it seperated and only make group of that perticular question
                    // give given number in that name
                    className="radio-input"
                    value={data}
                    checked={selectedOption[questionIndex] === data}
                    onChange={() => handleOptionChange(questionIndex, data)}
                  />
                  {data}
                  <br />
                </label>
              ))}
              <button
                className="clear-btn"
                onClick={() => ClearSelectedOption(questionIndex)}
              >
                Clear
              </button>
            </div>
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
      </div>
    </div>
  );
}

export default Quiz;
