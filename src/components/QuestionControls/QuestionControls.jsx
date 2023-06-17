import React from 'react';
//кнопки перемикання питань
export const QuestionControls = ({ handleNext, isNextDisabled }) => {
  return (
    <>
      <button onClick={handleNext} disabled={isNextDisabled}>
        Next Question
      </button>
    </>
  );
};
