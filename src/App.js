import './App.css';
import Serials from './components/Serials/Serials';
import Actors from './components/Actors/Actors';
import Layout from './components/Layout/Layout';
import Slick from './components/Slick/Slick';
import Section from './components/Section/Section';
import Movies from './components/Movies/Movies';
import New from './components/New/New';
import CardInfo from './components/CardInfo/CardInfo';

import { 
  HashRouter,
  Routes, 
  Route
} from 'react-router-dom';


function App() {
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
        </Route> 
      </Routes>
    </HashRouter>
    </>
  );
}

export default App;
