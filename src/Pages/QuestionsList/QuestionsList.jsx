import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QuestItem, QuestList } from './QuestionsList.styled';
import { Link, useLocation } from 'react-router-dom';

const regex = /[&<>"']/g;

export const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php', {
          params: {
            amount: 46,
            category: 20,
            difficulty: '',
            type: 'multiple',
          },
          signal: signal,
        });
        const filteredQuestions = response.data.results.filter(
          question => !question.question.match(regex)
        );
        setQuestions(filteredQuestions);
      } catch (error) {
        return 'message';
      }
    };

    fetchQuestions();

    return () => {
      abortController.abort();
    };
  }, []);

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const currentQuestion = questions[currentQuestionIndex];

  const filteredAnswers = currentQuestion?.incorrect_answers.filter(
    answer => !answer.match(regex)
  );

  if (currentQuestion && filteredAnswers.length === 3) {
    filteredAnswers.push(currentQuestion.correct_answer);
  }

  return (
    <>
      <Link to={backLinkHref}>Back to Home</Link>
      <QuestList>
        {currentQuestion && (
          <QuestItem key={currentQuestion.question}>
            <p>{currentQuestion.question}</p>
            <ul>
              {filteredAnswers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
          </QuestItem>
        )}
      </QuestList>
      <div>
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
      </div>
    </>
  );
};
