import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import QuestionControls from 'components/QuestionControls/QuestionControls';
import { fetchQuestions } from 'Functions/FetchQuestions';

import { QuestItem, QuestList } from './QuestionsList.styled';

export const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);

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

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsAnswerSelected(false);
  };

  const handleAnswerSelect = () => {
    setIsAnswerSelected(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const incorrectAnswers = currentQuestion?.incorrect_answers;
  // console.log('incorrectAnswers :>> ', incorrectAnswers);

  const correctAnswer = currentQuestion?.correct_answer;
  // console.log('correctAnswer', correctAnswer);

  return (
    <>
      <Link to={backLinkHref}>Back to Home</Link>
      <QuestList>
        {currentQuestion && (
          <QuestItem key={currentQuestion.question}>
            <p>{currentQuestion.question}</p>

            <ul>
              {currentQuestion &&
                incorrectAnswers &&
                incorrectAnswers.map(answer => (
                  <li key={answer}>
                    <button onClick={handleAnswerSelect}>{answer}</button>
                  </li>
                ))}
              <li>
                <button onClick={handleAnswerSelect}>{correctAnswer}</button>
              </li>
            </ul>
          </QuestItem>
        )}
      </QuestList>
      <QuestionControls
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        isPreviousDisabled={currentQuestionIndex === 0}
        isNextDisabled={
          !isAnswerSelected || currentQuestionIndex === questions.length - 1
        }
      />
    </>
  );
};
