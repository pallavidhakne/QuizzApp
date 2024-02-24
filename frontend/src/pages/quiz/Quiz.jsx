import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { Checkbox } from 'antd';
function Quiz() {
    const [quiz,setquiz]= useState([]);
    const [currpageNo,setCurrPageNo]=useState(1);

    //creating multiple options from incorrect options and correct answer data
   // const allOptions = [questionData.correctAnswer, ...questionData.incorrectAnswers];
    const totalQuestions=5;
   // const [ind,setInd]=useState(0);
    //console.log("hello pallavi")
    useEffect(()=>{
        axios.get('http://localhost:3000/api/quizz')
        .then((response)=>{
           // console.log(response.data)
            setquiz(response.data);
            
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    // for adding pages and on each page no of questions is 5
    const IndexOfLastQuestion=currpageNo*totalQuestions;
    const IndexofFirstQuestion=IndexOfLastQuestion-totalQuestions;
    const currQuestion=quiz.slice(IndexofFirstQuestion,IndexOfLastQuestion);
    const handleNextPage = () => {
        setCurrPageNo((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrPageNo((prevPage) => Math.max(1, prevPage - 1));
    };
    //creating multiple options from incorrect options and correct answer data
    //array
    const shuffleArray=(array,element)=>{
        const shuffledArray=[...array];
        const elementIndex=shuffledArray.indexOf(element);
        for(let i=shuffledArray.length-1;i>0;i--)
        {
            const j=Math.floor(Math.random()*(i+1));
            [shuffledArray[i],shuffledArray[j]]=[shuffledArray[j],shuffledArray[i]];
        }
        return shuffledArray;
    }
    
    // useEffect(() => {
        
    //     setInd((prevInd) => prevInd + 1);
    // }, [quiz]);
   
  return (
    <div>
    <h1>Quiz Questions</h1>
    {currQuestion.map((question, index) => {
      const newArray = shuffleArray([...question.incorrectAnswers, question.correctAnswer], question.correctAnswer);
      return (
        <div key={index}>
          <h4>Q {IndexofFirstQuestion + index + 1} {question.question.text}</h4>
          <p>Options:</p>
          <ul>
            {newArray.map((element, index) => (
                
                <label key={index}>
                <input type="checkbox" style={{ marginRight: '10px', marginLeft:'10px',padding:'10p'}} /> {element}
              </label>
            ))}
          </ul>
        </div>
      );
    })}
    <button onClick={() => setCurrPageNo((prevPage) => Math.max(1, prevPage - 1))} disabled={currpageNo === 1}>Previous Page</button>
    <button onClick={() => setCurrPageNo((prevPage) => prevPage + 1)} disabled={IndexOfLastQuestion >= quiz.length}>Next Page</button>
  </div>
  )
}

export default Quiz