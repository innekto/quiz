import React from 'react';

export const AnswerList = ({
  currentQuestion,
  incorrectAnswers,
  correctAnswer,
  isAnswered,
  handleAnswerSelect,
}) => (
  <ul>
    {currentQuestion &&
      incorrectAnswers &&
      incorrectAnswers.map(answer => (
        <li key={answer}>
          <button
            disabled={isAnswered}
            onClick={() => handleAnswerSelect(answer)}
          >
            {answer}
          </button>
        </li>
      ))}
    <li>
      <button
        disabled={isAnswered}
        onClick={() => handleAnswerSelect(correctAnswer)}
      >
        {correctAnswer}
      </button>
    </li>
  </ul>
);
