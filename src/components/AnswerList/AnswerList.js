import React, { useState } from 'react';

export const AnswerList = ({
  currentQuestion,
  incorrectAnswers,
  correctAnswer,
  isAnswered,
  handleAnswerSelect,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const getButtonClass = answer => {
    if (isAnswered && answer === correctAnswer) {
      return 'correct';
    } else if (isAnswered && answer !== correctAnswer) {
      return 'incorrect';
    } else if (answer === selectedAnswer) {
      return 'selected';
    } else {
      return '';
    }
  };

  const handleAnswerButtonClick = answer => {
    setSelectedAnswer(answer);
    handleAnswerSelect(answer);
  };

  return (
    <ul>
      {currentQuestion &&
        incorrectAnswers &&
        incorrectAnswers.map(answer => (
          <li key={answer}>
            <button
              disabled={isAnswered}
              onClick={() => handleAnswerButtonClick(answer)}
              className={getButtonClass(answer)}
            >
              {answer}
            </button>
          </li>
        ))}
      <li>
        <button
          disabled={isAnswered}
          onClick={() => handleAnswerButtonClick(correctAnswer)}
          className={getButtonClass(correctAnswer)}
        >
          {correctAnswer}
        </button>
      </li>
    </ul>
  );
};

// import React, { useState, useEffect } from 'react';

// export const AnswerList = ({
//   currentQuestion,
//   incorrectAnswers,
//   correctAnswer,
//   isAnswered,
//   handleAnswerSelect,
// }) => {
//   const [selectedAnswer, setSelectedAnswer] = useState('');
//   const [shuffledAnswers, setShuffledAnswers] = useState([]);

//   useEffect(() => {
//     const shuffled = [...incorrectAnswers, correctAnswer].sort(
//       () => Math.random() - 0.5
//     );
//     setShuffledAnswers(shuffled);
//   }, [incorrectAnswers, correctAnswer]);

//   const getButtonClass = answer => {
//     if (isAnswered && answer === correctAnswer) {
//       return 'correct';
//     } else if (isAnswered && answer !== correctAnswer) {
//       return 'incorrect';
//     } else if (answer === selectedAnswer) {
//       return 'selected';
//     } else {
//       return '';
//     }
//   };

//   const handleAnswerButtonClick = answer => {
//     setSelectedAnswer(answer);
//     handleAnswerSelect(answer);
//   };

//   return (
//     <ul>
//       {currentQuestion &&
//         shuffledAnswers.map(answer => (
//           <li key={answer}>
//             <button
//               disabled={isAnswered}
//               onClick={() => handleAnswerButtonClick(answer)}
//               className={getButtonClass(answer)}
//             >
//               {answer}
//             </button>
//           </li>
//         ))}
//     </ul>
//   );
// };
