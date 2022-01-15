import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getExactMovie, getSimilar, getSerialSimilar, getSerialExact } from '../../store/MovieCardReducer';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LOGO_URL, SECTION_CARD_POSTER_URL, POSTER_URL } from '../../store/types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Slider from "react-slick";
import {NextArrow, PreviousArrow} from "../Slick/buttons/Arrows";
import SectionCard from '../SectionCard/SectionCard';
import css from './CardInfo.module.scss';


const CardInfo = ({fetchMovie, fetchSimilarMovie, movie, similar_movies, isFetching, mode, fetchSerial, fetchSimilarSerial}) => {
   const { id } = useParams();
   
   useEffect(() => {
      if(mode === "фильмы"){
         fetchMovie(id);
         fetchSimilarMovie(id);
      } else {
         fetchSerial(id);
         fetchSimilarSerial(id);
      }
   }, [])

   const average = arr => arr.reduce((a, x) => a + x, 0) / arr.length;

   const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 3,
      nextArrow : <NextArrow />,
      prevArrow : <PreviousArrow />,
    };

   const changeNumbers = (number) => {
      if(number !== null && number !== undefined){
         return number.toString().split("").map((item, index, arr) => {
               if(index === 0){
                  return item + " ";
               } else if(index % 3 === 0 && (index + 1) < arr.length){
                  return item + " ";
               } else {
                  return item;
               }
            }).join("");
      } else {
         return 0;
      }
   }


   return (
      <>
         {
            isFetching
            ? <>
            <div key={movie.id} className={css.wrapper}>
               <div className={css.textInfo}>
                  <div className={css.heading}>
                     <h1 className={css.title}>{movie.title}</h1> 
                     <p className={css.tagname}>{movie.tagline.slice(0, -1)}</p>
                     <p className={css.date}>
                        {movie.date.slice(0,4) + ", "}
                        <span className={css.genres}>
                           {
                              movie.genre.map((item, index) => index < movie.genre.length - 1 ? item.name + ", " : item.name)       
                           }
                        </span>
                        <span className={css.time}>
                        <FontAwesomeIcon icon={faStopwatch} className={css.clock} />
                           <span className={css.timeItem}><span className={css.timeMinutes}>
                           {Array.isArray(movie.minutes) ? " " +  average(movie.minutes) : " " + movie.minutes }
                           </span> min</span>
                        </span>
                     </p>
                     <div className={css.companyWrapper}>
                     Производственные компании : 
                        {
                           movie.production_companies && movie.production_companies.map((item, index) => {
                              return (<span key={index} className={css.company}>
                                          <img className={css.companyLogo} alt="logo" src={LOGO_URL + item.logo_path} />
                                    </span>
                                 );
                           })
                        }
                     </div>
                     <div className={css.country}>
                     Страны-производители :
                        {
                           movie.production_countries && movie.production_countries.map((item, index) => {
                              return (<span key={index} className={css.countryItem}>
                                       {item.name}
                                    </span>
                              );
                           })
                        }
                     </div>
                  </div>
                  <div className={css.bottom}>
                     <div className={css.progress} style={{ width: 75 }}>
                        <CircularProgressbar
                           value={parseInt(movie.rate) * 10}
                           text={`${parseInt(movie.rate) * 10}%`}
                           background
                           backgroundPadding={6}
                           maxValue={100}
                           minValue={0}
                           styles={buildStyles({
                              backgroundColor: "#3e98c7",
                              textColor: "#fff",
                              pathColor: "#fff",
                              trailColor: "transparent",
                              width: "75px"
                           })}
                           />
                     </div>
                     <div className={css.money}>
                        <p className={css.votes}>
                           Общее количество голосов : {movie.totalVote}
                        </p>
                        <p className={css.budget}> Бюджет : {changeNumbers(movie.budget)}$</p>
                        <p className={css.revenue}> Доход : {changeNumbers(movie.revenue)}$</p>
                     </div>
                  </div>
               </div>
               <div className={css.imageWrapper}>
                  <img className={css.image} src={SECTION_CARD_POSTER_URL + movie.poster} alt="poster" />
                  <p className={css.overview}>{movie.overview}</p>
               </div>
            </div>
            <div className={css.slider}>
               <Slider {...settings}>
                  {isFetching === true && similar_movies !== undefined ?
                     similar_movies.map((item, index) => <SectionCard 
                        key={index} 
                        id={item.id}
                        title={item.original_title ? item.original_title : item.original_name} 
                        background={item.poster_path ? item.poster_path : item.backdrop_path} 
                        genre={item.genre_ids} 
                        country={item.origin_country && item.origin_country} 
                        date={item.release_date ? item.release_date : item.first_air_date}
                        rate={item.vote_average}
                        mode={item.release_date ? 'фильмы' : 'сериалы'}
                  />) : <h1>Loading...</h1>}
               </Slider>
            </div>
         </>
            : <h1>Loading...</h1>}
      </>
   );
}


const mapStateToProps = state => ({
   movie : state.MovieCardReducer.movie,
   similar_movies : state.MovieCardReducer.similar_movies,
   isFetching : state.MovieCardReducer.fetching,
});

const mapDispatchToProps = (dispatch) => {
   return {
      fetchMovie : (id) => dispatch(getExactMovie(id)),
      fetchSimilarMovie : (id) => dispatch(getSimilar(id)),
      fetchSerial : (id) => dispatch(getSerialExact(id)),
      fetchSimilarSerial : (id) => dispatch(getSerialSimilar(id)),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardInfo);