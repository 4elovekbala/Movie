import { connect } from 'react-redux';
import { addMoviesThunk, sortByName, sortByVote, sortByPopularity, resetSort } from '../../store/SerialReducer';
import Pattern from '../PagePatterns/Pattern';

const Serials = ({arr, fetching, fetchMovie, nameSort, voteSort, popularitySort, sortReset, title }) => {
  return (
     <Pattern 
         arr={arr} 
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
   arr: state.SerialReducer.serials.array,
   fetching : state.SerialReducer.serials.isFetching,
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

export default connect(mapStateToProps, mapDispatchToProps)(Serials);