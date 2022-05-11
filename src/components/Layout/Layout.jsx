import { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import css from './Layout.module.scss';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo } from '@fortawesome/free-regular-svg-icons';
import { API_KEY } from '../../store/types';

const Layout = (state) => {
   const [search, setSearch] = useState(false);
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

   const reloadHandler = () => {
      setTimeout(() => {
         window.location.reload();
      }, 100)
      setSearch(false);
   }

   return (
      <div className={css.container}>
         {
            search && <div className={css.popUp}>
                        <div className={css.popUpWrapper}>
                           <div className={css.close}>
                              <FontAwesomeIcon onClick={() => setSearch(false)} icon={faTimesCircle} className={css.icon} />
                           </div>
                           <div className={css.popUpInner}>
                              <h1 className={css.searchTitle}>Поиск</h1>
                              <div className={css.searchInput}>
                                 <input className={css.input} type="text" 
                                        placeholder="ВВедите название фильма" 
                                        value={input} 
                                        onChange={(e) => setInput(e.currentTarget.value)} 
                                        onKeyDown={handleKeyPress}
                                        />
                                 <button className={css.button} 
                                    onClick={clickHandler}>Search</button>
                              </div>
                              <div className={css.movies}>
                                 {
                                    movies
                                    .map((item, index) =>  {
                                       if(index <= 15){
                                         return ( 
                                             <NavLink onClick={reloadHandler} to={`/movies/${item.id}`} key={index} className={css.movieWrapper} id={item.media_type}>
                                                <div className={css.icon}>
                                                   <FontAwesomeIcon icon={faFileVideo} className={css.movieIcon} />
                                                </div>
                                                <div className={css.textContent}>
                                                   <h2 className={css.movieTitle}>{item.title ? item.title : item.name}</h2>
                                                </div>
                                             </NavLink>
                                         );
                                       }
                                    }
                                    )
                                 }
                              </div>
                           </div>
                        </div>
                     </div> 
         }
         <div className={css.wrapper}>
            <Header search={search} setSearch={setSearch} />
            <Outlet />
         </div>
      </div>
   );
}

export default Layout;