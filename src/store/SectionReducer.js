import {
   NOW_PLAYING_MOVIE,
   POPULAR_MOVIE,
   UPCOMING_MOVIE,
   ON_THE_AIR_SERIALS,
   POPULAR_SERIALS,
   TOP_RATED_SERIALS,
   CHANGE_FETCHING_SECTION,
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
   isFetching: false,
};


export const SectionReducer = (state = initialState, action) => {
   switch (action.type) {
      case NOW_PLAYING_MOVIE:
         return {
            ...state,
            now_movie: {
               "name": "Сейчас в кино",
               "array": [...action.payload.array],
            },
         };
      case POPULAR_MOVIE:
         return {
            ...state,
            popular_movie: {
               "name": "Популярные фильмы",
               "array": [...action.payload.array],
            },
         };
      case UPCOMING_MOVIE:
         return {
            ...state,
            upcoming_movie: {
               "name": "Предстоящие фильмы",
               "array": [...action.payload.array],
            },
         };
      case ON_THE_AIR_SERIALS:
         return {
            ...state,
            now_serials: {
                  "name": "Сериалы этой недели",
                  "array": [...action.payload.array],
               },

         };
      case POPULAR_SERIALS:
         return {
            ...state,
            popular_serials: {
                  "name": "Популярные сериалы",
                  "array": [...action.payload.array],
               },

         };
      case TOP_RATED_SERIALS:
         return {
            ...state,
            top_rated_serials: {
               "name": "Лучшие сериалы",
               "array": [...action.payload.array],
            },
         };
      case CHANGE_FETCHING_SECTION:
         return {
            ...state,
            isFetching: action.payload.isFetching,
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

const changeIsFetching = () => {
   return {
      type: CHANGE_FETCHING_SECTION,
      payload: {
         isFetching: true
      }
   }
}

export const addMoviesThunk = () => {
   return (dispatch) => {
      Promise.all([getNowPlayingMovies(), getPopularMovies(), getUpcomingMovies(), getNowPlayingSerials(), getPopularSerials(), getTopRatedSerials()])
         .then(response => {
            dispatch(addNowPlayingMovies(response[0].data.results));
            dispatch(addPopularMovie(response[1].data.results));
            dispatch(addUpcomingMovies(response[2].data.results));
            dispatch(addNowPlayingSerials(response[3].data.results));
            dispatch(addPopularSerials(response[4].data.results));
            dispatch(addTopRatedSerials(response[5].data.results));
            dispatch(changeIsFetching());
         });
   }
}