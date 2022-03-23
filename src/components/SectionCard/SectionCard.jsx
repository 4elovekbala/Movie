import css from './SectionCard.module.scss';
import { SECTION_CARD_POSTER_URL } from '../../store/types';
import { allgenres } from '../genres';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';
import { NavLink } from 'react-router-dom';
import { getSimilar, getExactMovie, getSerialExact, getSerialSimilar } from '../../store/MovieCardReducer';
import { useDispatch } from 'react-redux';

const SectionCard = ({id, title, background, genre, country, date, rate, panel, mode}) => {
   const dispatch = useDispatch();

   const clickHandler = (id) => {
      if(mode === 'фильмы'){
         dispatch(getSimilar(id));
         dispatch(getExactMovie(id));
      } else {
         dispatch(getSerialExact(id));
         dispatch(getSerialSimilar(id));
      }
   }

   const getGenres = allgenres.filter(function(v) {
         return genre.some(function(v2) {
            return v.id == v2;
         }
   )})


   return (
      <>
         <NavLink onClick={(e) => clickHandler(id)} to={mode === 'фильмы' ? `/movies/${id}` : `/serials/${id}`} className={panel ? `${css.cardWrapper} ${css.cardWrapperPanel}` : css.cardWrapper} id={id}>
            <div className={css.card}>
               <img className={css.image} src={SECTION_CARD_POSTER_URL + background} alt="Poster" />
               <FontAwesomeIcon icon={faPlayCircle} className={css.play} />
               <input className={css.input} type="range" value={rate} disabled max="10" min="0" />
               <p className={css.rate}>{rate}</p>
               <p className={css.date}>{date  ? date.slice(0, 4) : ""} {country ? ", " + country : ""}</p>
               <p className={`${css.date} ${css.genres}`}>
               {
                  getGenres.map((item, index) => index < getGenres.length - 1 ? item.name + ", " : item.name)       
               }
               </p>
            </div>
            <div className={css.textSection}>
               <h3 className={css.title}>{title}</h3>
            </div>
         </NavLink>
      </>
   )
}


export default SectionCard;