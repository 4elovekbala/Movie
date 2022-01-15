import css from './New.module.scss';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addMoviesThunk } from '../../store/MovieReducer';
import { allgenres } from '../genres';
import { Card } from './Cards';
import { MiniCard } from './MiniCard';
import MoreButton from '../MoreButton/MoreButton';
 

const New = (state) => {
   const [counter, setCounter] = useState(1);

   useEffect(() => {
      state.fetchMovie(counter);
   }, [counter])


   return (
      <>
      <div className={css.titleWrapper}>
         <h1 className={css.title}>Что нового</h1>
      </div>
         <div className={css.container}>
            {state.now_movie.isFetching && 
            state.now_movie.array.map((item, index, arr) => {
               const getGenres = allgenres.filter(function(v) {
                     return item.genre_ids.some(function(v2) {
                        return v.id == v2;
                     }
               )})
               return (
                  index === 0 || index % 3 === 0
                  ? <Card key={index} item={item} getGenres={getGenres} />
                  : <MiniCard key={index} item={item} getGenres={getGenres} mode={'фильмы'} />
               );
            })}
         </div>
         <MoreButton counter={counter} setCounter={setCounter} />
      </>
   );
}

const mapStateToProps = (state) => ({
   now_movie: state.MovieReducer.now_movie,
})

const mapDispatchToProps = (dispatch) => {
   return {
      fetchMovie : (page) => dispatch(addMoviesThunk(page)),
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(New);