import './App.css';
import Serials from './components/Serials/Serials';
import Actors from './components/Actors/Actors';
import Layout from './components/Layout/Layout';
import Slick from './components/Slick/Slick';
import Section from './components/Section/Section';
import Movies from './components/Movies/Movies';
import New from './components/New/New';
import CardInfo from './components/CardInfo/CardInfo';
import User from './components/User/User';

import { 
  HashRouter,
  Routes, 
  Route
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addMoviesThunk } from './store/SectionReducer';
import { addMoviesToSliderThunk } from './store/SlickReducer';
import { getGuestThunk, getRequestToken } from './store/AuthReducer';
import { createToken } from './api/api';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addMoviesThunk());
    dispatch(addMoviesToSliderThunk());
    dispatch(getGuestThunk());

    const getToken = async () => {
      const { data } = await createToken();
      dispatch(getRequestToken({request_token : data.request_token}));
    }

    getToken();

  }, [])

  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={
            <>
              <Slick />
              <div className="section">
                <Section />
              </div>
            </>
          } />
          <Route path="news" element={<New />} />
          <Route path="movies" element={<Movies title={"Фильмы"} />} />
          <Route path="movies/:id" element={<CardInfo mode={"фильмы"} />} />
          <Route path="serials" element={<Serials title={"Сериалы"} />} />
          <Route path="serials/:id" element={<CardInfo mode={"сериалы"} />} />
          <Route path="actors" element={<Actors title={"Популярные Актеры"} />} />
          <Route path="user" element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          } />
        </Route> 
      </Routes>
    </HashRouter>
    </>
  );
}

export default App;
