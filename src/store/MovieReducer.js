import {
   NOW_PLAYING_MOVIE,
   SORT_BY_NAME,
   SORT_BY_VOTE,
   SORT_BY_POPULARITY,
   RESET_SORT
} from './types';

import {
   getNowPlayingMovies
} from '../api/api';

const initialState = {
   now_movie: {
      "array": []
   },
};


export const MovieReducer = (state = initialState, action) => {
   switch (action.type) {
      case NOW_PLAYING_MOVIE:
         let concat = [...state.now_movie.array, ...action.payload.array];
         var unique = Array.from(new Set(concat.map(JSON.stringify))).map(JSON.parse);
         return {
            ...state,
            now_movie: {
               array: [...unique],
               isFetching: true,
            },
         };
      case SORT_BY_NAME:
         return {
            ...state,
            now_movie: {
               array: state.now_movie.array.map(a => a).sort((a, b) => a.title.localeCompare(b.title)),
               isFetching: true,
            }
         };
      case SORT_BY_VOTE:
         return {
            ...state,
            now_movie: {
               array: state.now_movie.array.map(a => a)
                  .sort((a, b) => parseFloat(b.vote_average) - parseFloat(a.vote_average)),
               isFetching: true,
            }
         };
      case SORT_BY_POPULARITY:
         return {
            ...state,
            now_movie: {
               array: state.now_movie.array.map(a => a)
                  .sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)),
               isFetching: true,
            }
         };
      case RESET_SORT:
         return {
            ...state,
            now_movie: {
               array: state.now_movie.array.map(a => a).sort(),
               isFetching: true,
            }
         };
      default:
         return {
            ...state,
         }
   }
}

const addNowPlayingMovies = (arr) => {
   return {
      type: NOW_PLAYING_MOVIE,
      payload: {
         array: arr
      }
   }
}

export const sortByName = () => {
   return {
      type: SORT_BY_NAME
   }
}

export const sortByVote = () => {
   return {
      type: SORT_BY_VOTE
   }
}

export const sortByPopularity = () => {
   return {
      type: SORT_BY_POPULARITY
   }
}

export const resetSort = () => {
   return {
      type: RESET_SORT
   }
}

export const addMoviesThunk = (page) => {
   return (dispatch) => {
      getNowPlayingMovies(page).then(response => {
         dispatch(addNowPlayingMovies(response.data.results))
      })
   }
}