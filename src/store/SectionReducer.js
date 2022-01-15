import {
   NOW_PLAYING_MOVIE,
   POPULAR_MOVIE,
   UPCOMING_MOVIE,
   ON_THE_AIR_SERIALS,
   POPULAR_SERIALS,
   TOP_RATED_SERIALS,
} from './types';

import {
   getNowPlayingMovies,
   getPopularMovies,
   getUpcomingMovies,
   getNowPlayingSerials,
   getPopularSerials,
   getTopRatedSerials,
} from '../api/api';

const initialState = {
   now_movie: {},
   popular_movie: {},
   upcoming_movie: {},
   now_serials: {},
   popular_serials: {},
   top_rated_serials: {},
};


export const SectionReducer = (state = initialState, action) => {
   switch (action.type) {
      case NOW_PLAYING_MOVIE:
         return {
            ...state,
            now_movie: {
               "name": "Сейчас в кино",
               "array": [...action.payload.array],
               "isFetching": true,
            },
         };
      case POPULAR_MOVIE:
         return {
            ...state,
               popular_movie: {
                  "name": "Популярные фильмы",
                  "array": [...action.payload.array],
                  "isFetching": true,
               },
         };
      case UPCOMING_MOVIE:
         return {
            ...state,
               upcoming_movie: {
                  "name": "Предстоящие фильмы",
                  "array": [...action.payload.array],
                  "isFetching": true,
               },
         };
      case ON_THE_AIR_SERIALS:
         return {
            ...state,
               now_serials: {
                  "name": "Сериалы этой недели",
                  "array": [...action.payload.array],
                  "isFetching": true,
               },

         };
      case POPULAR_SERIALS:
         return {
            ...state,
               popular_serials: {
                  "name": "Популярные сериалы",
                  "array": [...action.payload.array],
                  "isFetching": true,
               },

         };
      case TOP_RATED_SERIALS:
         return {
            ...state,
               top_rated_serials: {
                  "name": "Лучшие сериалы",
                  "array": [...action.payload.array],
                  "isFetching": true,
               },
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

const addUpcomingMovies = (arr) => {
   return {
      type: UPCOMING_MOVIE,
      payload: {
         array: arr
      }
   }
}




const addPopularMovie = (arr) => {
   return {
      type: POPULAR_MOVIE,
      payload: {
         array: arr
      }
   }
}




const addNowPlayingSerials = (arr) => {
   return {
      type: ON_THE_AIR_SERIALS,
      payload: {
         array: arr
      }
   }
}


const addPopularSerials = (arr) => {
   return {
      type: POPULAR_SERIALS,
      payload: {
         array: arr
      }
   }
}


const addTopRatedSerials = (arr) => {
   return {
      type: TOP_RATED_SERIALS,
      payload: {
         array: arr
      }
   }
}

export const addMoviesThunk = () => {
   return (dispatch) => {
      getNowPlayingMovies().then(response => {
         dispatch(addNowPlayingMovies(response.data.results))
      })
      getPopularMovies().then(response => {
         dispatch(addPopularMovie(response.data.results))
      })
      getUpcomingMovies().then(response => {
         dispatch(addUpcomingMovies(response.data.results))
      })
      getNowPlayingSerials().then(response => {
         dispatch(addNowPlayingSerials(response.data.results))
      })
      getPopularSerials().then(response => {
         dispatch(addPopularSerials(response.data.results))
      })
      getTopRatedSerials().then(response => {
         dispatch(addTopRatedSerials(response.data.results))
      })
   }
}