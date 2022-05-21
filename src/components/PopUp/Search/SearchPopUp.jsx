import css from './SearchPopUp.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faFileVideo } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';

const SearchPopUp = ({setSearch, input, setInput, handleKeyPress, clickHandler, movies}) => {
   return (
      <>
         <div className={css.popUp}>
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
                                 <NavLink to={`/movies/${item.id}`} key={index} className={css.movieWrapper} id={item.media_type}>
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
      </>
   );
}

export default SearchPopUp;