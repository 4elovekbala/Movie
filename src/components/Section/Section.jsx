import css from './Section.module.scss';
import { useEffect } from 'react';
import { 
   addMoviesThunk,
} from '../../store/SectionReducer';
import { connect } from 'react-redux';
import SectionCard from '../SectionCard/SectionCard';
import Slider from "react-slick";
import {NextArrow, PreviousArrow} from "../Slick/buttons/Arrows";

const Section = (state) => {
   useEffect(() => {
      state.fetchMovie()
   }, []) 

    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 3,
      nextArrow : <NextArrow />,
      prevArrow : <PreviousArrow />,
    };

   return (
      <div className={css.sectionItemWrapper}>
         <div className={css.sectionItem}>
            <h1 className={css.title}>
               {state.now_movie.isFetching &&
                state.now_movie.name}
            </h1>
            <div className={css.slickSection}>
               <Slider {...settings}>
                  {state.now_movie.isFetching &&
                  state.now_movie.array.map((item, index) => <SectionCard 
                     key={index} 
                     id={item.id}
                     title={item.original_title ? item.original_title : item.original_name} 
                     background={item.poster_path ? item.poster_path : item.backdrop_path} 
                     genre={item.genre_ids} 
                     country={item.origin_country} 
                     date={item.release_date ? item.release_date : item.first_air_date}
                     rate={item.vote_average}
                     mode={item.release_date ? 'фильмы' : 'сериалы'}
                  />)}
               </Slider>
            </div>
         </div>
         <div className={css.sectionItem}>
            <h1 className={css.title}>
               {state.popular_movie.isFetching &&
                state.popular_movie.name}
            </h1>
            <div className={css.slickSection}>
               <Slider {...settings}>
                  {state.popular_movie.isFetching &&
                  state.popular_movie.array.map((item, index) => <SectionCard 
                     key={index} 
                     id={item.id}
                     title={item.original_title ? item.original_title : item.original_name} 
                     background={item.poster_path ? item.poster_path : item.backdrop_path} 
                     genre={item.genre_ids} 
                     country={item.origin_country} 
                     date={item.release_date ? item.release_date : item.first_air_date}
                     rate={item.vote_average}
                     mode={item.release_date ? 'фильмы' : 'сериалы'}
                  />)}
               </Slider>
            </div>
         </div>
         <div className={css.sectionItem}>
            <h1 className={css.title}>
               {state.upcoming_movie.isFetching &&
                state.upcoming_movie.name}
            </h1>
            <div className={css.slickSection}>
               <Slider {...settings}>
                  {state.upcoming_movie.isFetching &&
                  state.upcoming_movie.array.map((item, index) => <SectionCard 
                     key={index} 
                     id={item.id}
                     title={item.original_title ? item.original_title : item.original_name} 
                     background={item.poster_path ? item.poster_path : item.backdrop_path} 
                     genre={item.genre_ids} 
                     country={item.origin_country} 
                     date={item.release_date ? item.release_date : item.first_air_date}
                     rate={item.vote_average}
                     mode={item.release_date ? 'фильмы' : 'сериалы'}
                  />)}
               </Slider>
            </div>
         </div>
         <div className={css.sectionItem}>
            <h1 className={css.title}>
               {state.now_serials.isFetching &&
                state.now_serials.name}
            </h1>
            <div className={css.slickSection}>
               <Slider {...settings}>
                  {state.now_serials.isFetching &&
                  state.now_serials.array.map((item, index) => <SectionCard 
                     key={index} 
                     id={item.id}
                     title={item.original_title ? item.original_title : item.original_name} 
                     background={item.poster_path ? item.poster_path : item.backdrop_path} 
                     genre={item.genre_ids} 
                     country={item.origin_country} 
                     date={item.release_date ? item.release_date : item.first_air_date}
                     rate={item.vote_average}
                     mode={item.release_date ? 'фильмы' : 'сериалы'}
                  />)}
               </Slider>
            </div>
         </div>
         <div className={css.sectionItem}>
            <h1 className={css.title}>
               {state.isFetching &&
                state.popular_serials.name}
            </h1>
            <div className={css.slickSection}>
               <Slider {...settings}>
                  {state.isFetching &&
                  state.popular_serials.array.map((item, index) => <SectionCard 
                     key={index} 
                     id={item.id}
                     title={item.original_title ? item.original_title : item.original_name} 
                     background={item.poster_path ? item.poster_path : item.backdrop_path} 
                     genre={item.genre_ids} 
                     country={item.origin_country} 
                     date={item.release_date ? item.release_date : item.first_air_date}
                     rate={item.vote_average}
                     mode={item.release_date ? 'фильмы' : 'сериалы'}
                  />)}
               </Slider>
            </div>
         </div>
         <div className={css.sectionItem}>
            <h1 className={css.title}>
               {state.top_rated_serials.isFetching &&
                state.top_rated_serials.name}
            </h1>
            <div className={css.slickSection}>
               <Slider {...settings}>
                  {state.top_rated_serials.isFetching &&
                  state.top_rated_serials.array.map((item, index) => <SectionCard 
                     key={index} 
                     id={item.id}
                     title={item.original_title ? item.original_title : item.original_name} 
                     background={item.poster_path ? item.poster_path : item.backdrop_path} 
                     genre={item.genre_ids} 
                     country={item.origin_country} 
                     date={item.release_date ? item.release_date : item.first_air_date}
                     rate={item.vote_average}
                     mode={item.release_date ? 'фильмы' : 'сериалы'}
                  />)}
               </Slider>
            </div>
         </div>
      </div>
   );
}

const mapStateToProps = (state) => ({
   now_movie: state.SectionReducer.now_movie,
   popular_movie: state.SectionReducer.popular_movie,
   upcoming_movie: state.SectionReducer.upcoming_movie,
   now_serials: state.SectionReducer.now_serials,
   popular_serials: state.SectionReducer.popular_serials,
   top_rated_serials: state.SectionReducer.top_rated_serials,
   isFetching: state.SectionReducer.isFetching,
})

const mapDispatchToProps = (dispatch) => {
   return {
      fetchMovie : () => {
         dispatch(addMoviesThunk())
      },
   };
}
export default connect(mapStateToProps, mapDispatchToProps)(Section);