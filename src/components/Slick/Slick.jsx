import css from './Slick.module.scss';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { addMoviesToSliderThunk } from '../../store/SlickReducer';
import { NextArrow, PreviousArrow } from './buttons/Arrows';
import { POSTER_URL } from '../../store/types';
import Slider from "react-slick";
import { NavLink } from 'react-router-dom';

const Slick = (state) => {
   useEffect(() => {
      state.fetchSliderMovies();
   }, []);

   const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '80px',
      nextArrow : <NextArrow />,
      prevArrow : <PreviousArrow />,
    };

   return (
      <div className={css.slickWrapper}>
         {
            <Slider {...settings}>
               {
               state.slider.map((item, index) => {
                     return (
                        <NavLink to={`/movies/${item.id}`} key={item.id} className={css.posterWrapper}>
                           <div className={css.posterInner} style={{backgroundImage : `url('${POSTER_URL}${item.backdrop_path}')` }}>
                              <h2 className={css.posterTitle}>{item.original_title ? item.original_title : item.original_name}</h2>
                           </div>
                        </NavLink>
                     );
                  })
               }
            </Slider>
         }
      </div>
   );
}

const mapStateToProps = (state) => ({
   slider : state.SlickReducer.slider,
})

const mapDispatchToProps = (dispatch) => {
   return {
      fetchSliderMovies : () => dispatch(addMoviesToSliderThunk()),
   };
}
export default connect(mapStateToProps, mapDispatchToProps)(Slick);