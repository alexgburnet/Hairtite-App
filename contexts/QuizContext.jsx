// QuizContext.js
import React, { createContext, useState, useContext } from 'react';

// Create Context
const QuizContext = createContext();

// Create Provider Component
export const QuizProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizLastCompleted, setQuizLastCompleted] = useState(null);

  const incrementScore = () => setScore(score + 1);
  const nextQuestion = () => setCurrentQuestionIndex(index => index + 1);
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizLastCompleted(new Date());
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestionIndex,
        score,
        quizLastCompleted,
        incrementScore,
        nextQuestion,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

// Custom hook for using context
export const useQuiz = () => useContext(QuizContext);