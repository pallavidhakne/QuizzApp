import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function Quiz() {
  const [quizData, setquizData] = useState([]);
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
  return (
    <div>
      <h1>Quiz Problems</h1>
      {/* Rendering our quiz data here */}
      {quizData.map((quiz, index) => (
        <div key={index}>
          <h3>
            Q{index + 1}
            {quiz.question}
          </h3>
          {quiz.option.map((data, ind) => (
            <p key={ind}>{data}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Quiz;
