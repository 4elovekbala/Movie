import css from './Section.module.scss';
import { useEffect, useState } from 'react';
import { 
   addMoviesThunk,
} from '../../store/SectionReducer';
import { connect } from 'react-redux';
import SectionCard from '../SectionCard/SectionCard';
import Slider from "react-slick";
import {NextArrow, PreviousArrow} from "../Slick/buttons/Arrows";

const Section = (state) => {
   const [sectionArray, setSectionArray] = useState([]);

   useEffect(() => {
      if(state.isFetching === true){
         setSectionArray(prev => [...prev, state.now_movie])
         setSectionArray(prev => [...prev, state.popular_movie])
         setSectionArray(prev => [...prev, state.upcoming_movie])
         setSectionArray(prev => [...prev, state.now_serials])
         setSectionArray(prev => [...prev, state.popular_serials])
         setSectionArray(prev => [...prev, state.top_rated_serials])
      }
   }, [state.isFetching])


   useEffect(() => {
      console.log(sectionArray);
   }, [sectionArray])

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
         {
            state.isFetching 
            ?
               sectionArray && sectionArray.map(section => (
                  <div key={section.name} className={css.sectionItem}>
                     <h1 className={css.title}>
                        {section.name}
                     </h1>
                     <div className={css.slickSection}>
                        <Slider {...settings}>
                           {section.array.map((item, index) => <SectionCard 
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
               ))
            : 
            <div>Loading...</div>
         }
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
