import { connect } from 'react-redux';
import { addMoviesThunk, sortByName, sortByVote, sortByPopularity, resetSort } from '../../store/MovieReducer';
import Pattern from '../PagePatterns/Pattern';

const Movies = ({arr, fetching, fetchMovie, nameSort, voteSort, popularitySort, sortReset, title }) => {
  return (
     <Pattern arr={arr} 
         fetching={fetching} 
         fetchMovie={fetchMovie} 
         nameSort={nameSort} 
         voteSort={voteSort} 
         popularitySort={popularitySort}
         sortReset={sortReset}
         title={title}
         resetSort={resetSort}
         />
  )
}

const mapStateToProps = (state) => ({
   arr: state.MovieReducer.now_movie.array,
   fetching : state.MovieReducer.now_movie.isFetching,
})

const mapDispatchToProps = (dispatch) => {
   return {
      fetchMovie : (page) => dispatch(addMoviesThunk(page)),
      nameSort : () => dispatch(sortByName()),
      voteSort : () => dispatch(sortByVote()),
      popularitySort : () => dispatch(sortByPopularity()),
      sortReset : () => dispatch(resetSort())
   };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);