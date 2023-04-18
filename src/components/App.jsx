import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SharedLayout } from './Layout/Layout';
import { QuestionList } from '../Pages/QuestionsList/QuestionsList';
// const About = lazy(() => import("../pages/About"));
const Home = lazy(() => import('../Pages/Home/Home'));
// const ProductDetails = lazy(() => import("../pages/ProductDetails"));
// const Products = lazy(() => import("../pages/Products"));
// const Mission = lazy(() => import("./Mission"));
// const Team = lazy(() => import("./Team"));
// const Reviews = lazy(() => import("./Reviews"));

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="/:id" element={<QuestionList />} />
        {/* <Route path="about" element={<About />}>
          <Route path="mission" element={<Mission />} />
          <Route path="team" element={<Team />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} /> */}
      </Route>
    </Routes>
  );
};