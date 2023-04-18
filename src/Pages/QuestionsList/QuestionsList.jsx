import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { QuestionControls } from 'components/QuestionControls/QuestionControls';
import { fetchQuestions } from 'Functions/FetchQuestions';

import { Message } from 'components/Message/Message';
import { AnswerList } from 'components/AnswerList/AnswerList';
import { QuestionAnswerHandlers } from '../../Functions/QuestionAnswerHandlers';

import { QuestItem, QuestList } from './QuestionsList.styled';

export const QuestionList = () => {
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

  const { handlePrevious, handleNext, handleAnswerSelect } =
    QuestionAnswerHandlers({
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

  const correctAnswer = currentQuestion?.correct_answer;

  return (
    <>
      <Link to={backLinkHref}>Back to Home</Link>
      <QuestList>
        {currentQuestion && (
          <QuestItem key={currentQuestion.question}>
            <p>{currentQuestion.question}</p>
            <AnswerList
              currentQuestion={currentQuestion}
              incorrectAnswers={incorrectAnswers}
              correctAnswer={correctAnswer}
              handleAnswerSelect={handleAnswerSelect}
              isAnswered={isAnswered}
            />
          </QuestItem>
        )}
      </QuestList>
      <QuestionControls
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        isPreviousDisabled={currentQuestionIndex === 0}
        isNextDisabled={!isAnswerSelected}
      />
      <Message />
      <p>{numCorrectAnswers}</p>
      <p>{numIncorrectAnswers}</p>
    </>
  );
};
