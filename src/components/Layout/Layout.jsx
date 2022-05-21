import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import css from './Layout.module.scss';
import { API_KEY } from '../../store/types';
import SearchPopUp from '../PopUp/Search/SearchPopUp';
import LoginPopUp from '../PopUp/Login/LoginPopUp';
import { useSelector } from 'react-redux';

const Layout = () => {
   const [search, setSearch] = useState(false);
   const [login, setLogin] = useState(false);
   const [input, setInput] = useState('');
   const [movies, setMovies] = useState([]);
   const url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${input}`;


   const handleKeyPress = (event) => {
      if(event.key == 'Enter' && input !== ''){
          fetch(url)
         .then(response => response.json())
         .then(data => setMovies(data.results))
         setInput('');
      }
   }

   const clickHandler = () => {
      if(input !== ''){
         fetch(url)
         .then(response => response.json())
         .then(data => setMovies(data.results))
      }
      setInput('');
   }

   return (
      <div className={css.container}>
         {
            search && <SearchPopUp 
               movies={movies} 
               input={input}
               setInput={setInput} 
               clickHandler={clickHandler} 
               setSearch={setSearch}
               handleKeyPress={handleKeyPress} 
               />
         }
         {
            login && <LoginPopUp
               setLogin={setLogin}
             />
         }
         <div className={css.wrapper}>
            <Header setSearch={setSearch} setLogin={setLogin} />
            <Outlet />
         </div>
      </div>
   );
}

export default Layout;