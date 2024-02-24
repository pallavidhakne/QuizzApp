import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
function Quiz() {
    const [quiz,setquiz]= useState([]);
    const [currpageNo,setCurrPageNo]=useState(1);
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

    // useEffect(() => {
        
    //     setInd((prevInd) => prevInd + 1);
    // }, [quiz]);
  return (
    <div>
         <h1>Quiz Questions</h1>
            {
                currQuestion.map((question, index) => (
                    <div key={index}>
                        {/* <p>Category: {question.category}</p> */}
                        {/* <p>ID: {question.id}</p> */}
                        <h4>Q {IndexofFirstQuestion+index+1} {question.question.text}</h4>
                        <h5>Correct Answer: {question.correctAnswer}</h5>
                        <p>Incorrect Answers:</p>
                        <ul>
                            {question.incorrectAnswers.map((incorrectAnswer, i) => (
                                <li key={i}>{incorrectAnswer}</li>
                            ))}
                        </ul>
                        
                    </div>
                    
                ))
            }
            <button onClick={handlePrevPage} disabled={currpageNo===1}>Previous Page</button>
            <button onClick={handleNextPage} disabled={IndexOfLastQuestion >=quiz.length}>Next Page</button>
    </div>
  )
}

export default Quiz