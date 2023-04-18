import axios from 'axios';

//перевірка на спец символи
const regex = /[&<>"']/g;
//функція запиту на сервер
export const fetchQuestions = async signal => {
  try {
    const response = await axios.get('https://opentdb.com/api.php', {
      params: {
        amount: 46,
        category: 20,
        difficulty: '',
        type: 'multiple',
      },
      signal,
    });
    // вибираємо питання які не містять спец символів
    const filteredQuestions = response.data.results.filter(
      question => !question.question.match(regex)
    );
    return filteredQuestions;
  } catch (error) {
    return 'message';
  }
};
