import css from './New.module.scss';
import { MOVIE_CARD_POSTER_URL } from '../../store/types';
import { useState } from 'react';

export const Card = ({item, getGenres}) => {
   const [overview, setOverview] = useState(false);
   return (
      <a className={css.cardWrapper} id={item.id} key={item.id}>
         <div className={css.card}>
            <img className={css.image} src={MOVIE_CARD_POSTER_URL + item.poster_path} alt="Poster" />
            <div className={overview ? `${css.text} ${css.height}` : css.text}>
               <div className={css.titleSection}>
                  <h2 className={css.title}>{item.original_title ? item.original_title : item.original_name}</h2>
                  <div className={css.textContainer}>
                     <span className={item.vote_average > 7.5 ? `${css.rateText} ${css.green}` : css.rateText}>{item.vote_average}</span>
                     <span className={css.date}>
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
               <div className={overview ? `${css.subtitleSection} ${css.height}` : css.subtitleSection}>
                  {item.overview}
               </div>
            </div>
            <div className={css.btnWrapper}><button className={css.btn} onClick={() => setOverview(!overview)}>Развернуть</button></div>
         </div>
      </a>
   );
}
