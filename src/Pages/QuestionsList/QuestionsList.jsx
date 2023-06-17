import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { QuestionControls } from 'components/QuestionControls/QuestionControls';
import { fetchQuestions } from 'Functions/FetchQuestions';

import { Message } from 'components/Message/Message';
import { AnswerList } from 'components/AnswerList/AnswerList';
import { QuestionAnswerHandlers } from '../../Functions/QuestionAnswerHandlers';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [numIncorrectAnswers, setNumIncorrectAnswers] = useState(0);

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetchQuestions(signal).then(filteredQuestions => {
      setQuestions(filteredQuestions);
    });

    return () => {
      abortController.abort();
    };
  }, []);

  const { handleNext, handleAnswerSelect } = QuestionAnswerHandlers({
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setIsAnswerSelected,
    setIsAnswered,
    setNumCorrectAnswers,
    setNumIncorrectAnswers,
  });

  const currentQuestion = questions[currentQuestionIndex];

  const incorrectAnswers = currentQuestion?.incorrect_answers;
  console.log('incorrectAnswers', incorrectAnswers);
  const correctAnswer = currentQuestion?.correct_answer;

  return (
    <>
      <Link to={backLinkHref}>Back to Home</Link>
      <div>
        {currentQuestion && (
          <div key={currentQuestion.question}>
            <p>{currentQuestion.question}</p>
            <AnswerList
              currentQuestion={currentQuestion}
              incorrectAnswers={incorrectAnswers}
              correctAnswer={correctAnswer}
              handleAnswerSelect={handleAnswerSelect}
              isAnswered={isAnswered}
            />
          </div>
        )}
      </div>
      <QuestionControls
        handleNext={handleNext}
        isNextDisabled={!isAnswerSelected}
      />
      <Message />
      <p>{numCorrectAnswers}</p>
      <p>{numIncorrectAnswers}</p>
    </>
  );
};
export default QuestionList;
