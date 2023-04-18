import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QuestItem, QuestList } from './QuestionsList.styled';
import { Link, useLocation } from 'react-router-dom';

//перевірка на присутність спеціальних символів у питанні
const regex = /[&<>"']/g;

export const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  const location = useLocation();
  //якщо state існує, то  використовуємо параметр from,
  // який вказує на те, звідки прийшли на цю сторінку, для створення посилання "Back to Home".
  // якщо state не існує, то backLinkHref міститиме звичайний шлях по замовчуванню - /.
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    //Тут можна використовувати AbortController для того
    //щоб скасувати запит до API, якщо компонент QuestionList було розміщено на сторінці
    //але користувач ще не відвідав її.
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
        setQuestions(response.data.results);
      } catch (error) {
        return 'message';
      }
    };

    fetchQuestions();

    return () => {
      abortController.abort();
    };
  }, []);
  //   console.log('questions', questions);
  //сортуємо за питання складністю
  const sortedQuestions = [...questions].sort((a, b) => {
    if (a.difficulty === 'easy' && b.difficulty !== 'easy') {
      return -1;
    }
    if (a.difficulty !== 'easy' && b.difficulty === 'easy') {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <Link to={backLinkHref}>Back to Home</Link>
      <QuestList>
        {sortedQuestions
          .filter(question => !regex.test(question.question))
          .map(question => (
            <QuestItem key={question.question}>
              <p>{question.question}</p>
            </QuestItem>
          ))}
      </QuestList>
    </>
  );
};
