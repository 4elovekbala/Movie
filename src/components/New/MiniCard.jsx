import css from './New.module.scss';
import { POSTER_URL } from '../../store/types';
import { NavLink } from 'react-router-dom';

export const MiniCard = ({item, getGenres, mode}) => {
   return (
      <NavLink to={mode === 'фильмы' ? `/movies/${item.id}` : `/tv/${item.id}`} className={css.miniCardWrapper} id={item.id} key={item.id}>
         <div className={css.miniCard}>
            <img className={css.miniImage} src={POSTER_URL + item.backdrop_path} />
            <div className={css.nextSection}>
               <div className={css.miniOverview}>
                  {item.overview}
               </div>
               <div className={css.textSection}>
                  <h2 className={css.miniTitleItem}>{item.original_title ? item.original_title : item.original_name}</h2>
                  <div className={css.miniTextContainer}>
                        <span className={item.vote_average > 7.5 ? `${css.miniRateText} ${css.green}` : css.miniRateText}>{item.vote_average}</span>
                        <span className={css.miniDate}>
                           {item.release_date ? item.release_date.slice(0, 4) + " " : item.first_air_date.slice(0, 4)  + " "} 
                           {item.origin_country ? ", " + item.origin_country : ""}
                        </span>
                        <span className={css.genres}>
                           {
                              getGenres.map((item, index) => index < getGenres.length - 1 ? item.name + ", " : item.name)       
                           }
                        </span>
                  </div>   
               </div>
            </div>
         </div>
         <button className={css.playBtn}>Play</button>
      </NavLink>
   );
}