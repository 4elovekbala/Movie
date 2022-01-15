import { connect } from 'react-redux';
import { addMoviesThunk, sortByName, sortByPopularity, resetSort } from '../../store/ActorsReducer';
import ActorsPage from '../ActorsPage/ActorsPage';

const Actors = ({arr, fetching, fetchMovie, nameSort, popularitySort, sortReset, title }) => {
  return (
     <ActorsPage 
         arr={arr} 
         fetching={fetching} 
         fetchMovie={fetchMovie} 
         nameSort={nameSort} 
         popularitySort={popularitySort}
         sortReset={sortReset}
         resetSort={resetSort}
         title={title}
         />
  )
}

const mapStateToProps = (state) => ({
   arr: state.ActorsReducer.actors.array,
   fetching : state.ActorsReducer.actors.isFetching,
})

const mapDispatchToProps = (dispatch) => {
   return {
      fetchMovie : (page) => dispatch(addMoviesThunk(page)),
      nameSort : () => dispatch(sortByName()),
      popularitySort : () => dispatch(sortByPopularity()),
      sortReset : () => dispatch(resetSort())
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Actors);