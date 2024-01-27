"use client";
import React, { useState, useEffect } from "react";
import { triviaQuestion } from "../questionBank";

const TriviaPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [optionSelected, setOptionSelected] = useState("");
  const [choice, setChoice] = useState(false);
  const [choiceIdx, setChoiceIdx] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    numCorrect: 0,
    numWrong: 0,
  });

  useEffect(() => {
    // Shuffle the questions array and select the first 10 questions
    const shuffledQuestions = triviaQuestion.questions
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setQuestions(shuffledQuestions);
  }, []);

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const { question, options, answer } = questions[currentQuestion];

  const onOptionSelected = (choice, idx) => {
    setChoice(true);
    setChoiceIdx(idx);
    if (choice === answer) {
      setOptionSelected(true);
    } else {
      setOptionSelected(false);
    }
  };

  const incrementQuestion = () => {
    setChoiceIdx(null);
    setResult((val) =>
      optionSelected
        ? {
            ...val,
            score: val.score + 10,
            numCorrect: val.numCorrect + 1,
          }
        : {
            ...val,
            numWrong: val.numWrong + 1,
          }
    );
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((val) => val + 1);
    } else {
      setCurrentQuestion(0);
      setShowResult(true);
    }
    setChoice(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <h2>
          {showResult ? "Your Score" : `Question: ${currentQuestion + 1}`}
          {""}
          <span>{showResult ? "" : `/${questions.length}`}</span>
        </h2>
      </div>
      <div>
        {!showResult ? (
          <div className="triviaQuestion-container bg-white p-4 rounded shadow-md">
            <h3 className="text-gray-700 text-lg pb-4">{question}</h3>
            {options.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => onOptionSelected(answer, idx)}
                className={
                  choiceIdx === idx
                    ? "li-selected"
                    : "li-hover cursor-pointer my-3 p-4 text-black border border-gray-300 rounded"
                }
              >
                <span>{answer}</span>
              </li>
            ))}
            {choice ? (
              <button
                onClick={incrementQuestion}
                className="bg-teal-500 text-white px-4 py-2 w-full mt-4 text-base font-bold rounded cursor-pointer"
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            ) : (
              <button
                onClick={incrementQuestion}
                disabled
                className="bg-gray-700 text-white px-4 py-2 w-full mt-4 text-base font-bold rounded cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            )}
          </div>
        ) : (
          <div className="triviaQuestion-container bg-white p-4 rounded shadow-md">
            <h3 className="text-gray-700 text-2xl font-bold mb-4">Results</h3>
            <h3 className="text-gray-700 text-lg pb-4">
              Overall {(result.score / (questions.length * 10)) * 100}%
            </h3>
            <p>
              Total Questions: <span>{questions.length}</span>
            </p>
            <p>
              Total Score: <span>{result.score}</span>
            </p>
            <p>
              Correct Answers: <span>{result.numCorrect}</span>
            </p>
            <p>
              Incorrect Answers: <span>{result.numWrong}</span>
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-teal-500 text-white px-4 py-2 mt-4 text-base font-bold rounded cursor-pointer"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TriviaPage;
