import css from './ActorCard.module.scss';
import { ACTOR_IMAGE } from '../../store/types';
import { useEffect, useState } from 'react';
import { API_KEY } from '../../store/types';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SectionCard from '../SectionCard/SectionCard';

const ActorCard = ({name, image, id, movies, fetching}) => {
   const [moreInfo, setMoreInfo] = useState(false);
   const [actor, setActor] = useState(null);
   
   const clickHandler = () => {
      setMoreInfo(true);
   }

   useEffect(() => {
      const url = `https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`;
      fetch(url)
         .then(response => response.json())
         .then(data => setActor(data));
   }, [])

   return (
      <>
      <div onClick={clickHandler} className={css.wrapper} id={id}>
         <div className={css.inner}>
            {
               image === null 
               ? <div className={css.noImage}>
                  <img className={css.noImageItem} src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg" />
               </div> 
               : <img className={css.image} src={ACTOR_IMAGE + image} alt="image" />
            }
            <div className={css.nameWrapper}>
               <h1 className={css.name}>{name}</h1>
            </div>
         </div>
      </div>
      {moreInfo && 
      <div className={css.popUp}>
         <div className={css.wrapperPop}>
            <div className={css.close}>
               <FontAwesomeIcon onClick={() => setMoreInfo(false)} icon={faTimesCircle} className={css.icon} />
            </div>
            <div className={css.innerPop}>
               <div className={css.imageContent}>
                  {
                     image === null 
                     ? <div className={css.noImage}>
                        <img className={css.noImageItem} src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg" />
                     </div> 
                     : <img className={css.image} src={ACTOR_IMAGE + image} alt="image" />
                  }
                  <div className={css.nameWrapper}>
                     <p className={css.date}>{actor.birthday ? actor.birthday.slice(0, 4) + ", " : ""}{actor.place_of_birth ? actor.place_of_birth : ""}</p>
                     <h1 className={css.name}>{name}</h1>
                  </div>
               </div>
               <div className={css.textContent}>
                  <p className={css.biography}>{actor.biography ? actor.biography : ""}</p>
                  <div className={css.movies}>
                        {fetching &&
                        movies.map((item, index) => {
                           return (
                              <div key={index} className={css.moviesItemWrapper}>
                                 <SectionCard 
                                    key={index} 
                                    id={item.id}
                                    title={item.original_title ? item.original_title : item.original_name} 
                                    background={item.poster_path ? item.poster_path : item.backdrop_path} 
                                    genre={item.genre_ids} 
                                    country={item.origin_country} 
                                    date={item.release_date ? item.release_date : item.first_air_date}
                                    rate={item.vote_average}
                                    mode={item.release_date ? 'фильмы' : 'сериалы'}
                                 />
                              </div>
                           );
                        })}
                  </div>
               </div>
            </div>
         </div>   
      </div>
      }
      </>
   );
}


export default ActorCard;