import { Link } from 'react-router-dom';
import React from 'react';
// import QuestionList from './QuestionList';

const Home = () => {
  return (
    <main>
      <h2>Mythology</h2>
      <Link to="/questions">Lets Go</Link>
    </main>
  );
};

export default Home;
