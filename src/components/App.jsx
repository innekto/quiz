import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './Layout/Layout';
import QuestionList from '../Pages/QuestionsList/QuestionsList';

const Home = lazy(() => import('../Pages/Home/Home'));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<QuestionList />} />
      </Route>
    </Routes>
  );
};
