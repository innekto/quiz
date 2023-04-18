import React from 'react';
//кнопки перемикання питань
export const QuestionControls = ({
  handlePrevious,
  handleNext,
  isPreviousDisabled,
  isNextDisabled,
}) => {
  return (
    <div>
      <button onClick={handlePrevious} disabled={isPreviousDisabled}>
        Previous
      </button>
      <button onClick={handleNext} disabled={isNextDisabled}>
        Next
      </button>
    </div>
  );
};
