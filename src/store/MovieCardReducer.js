import {
   ADD_EXACT_MOVIE,
   ADD_SIMILAR,
   RATE_MOVIE,
} from './types';

import {
   getExactMovieInfo,
   getSimilarMovies,
   getExactSerial,
   getSimilarSerials,
   rateMovieRequest,
} from '../api/api';

let initialState = {
   movie: {
      title: "",
      id: null,
      date: "",
      popularity: "",
      rate: null,
      totalVote: null,
      overview: "",
      backdrop: "",
      poster: null,
      genre: [],
      minutes: "",
      revenue: null,
      tagline: "",
      status: null,
      budget: null,
      production_companies: [],
      production_countries: [],
   },
   similar_movies: [],
   fetching: false,
};

export const MovieCardReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_EXACT_MOVIE:
         return {
            ...state,
            movie: {
                  title: action.payload.title,
                  id: action.payload.id,
                  date: action.payload.date,
                  popularity: action.payload.popularity,
                  rate: action.payload.rate,
                  totalVote: action.payload.totalVote,
                  overview: action.payload.overview,
                  backdrop: action.payload.backdrop,
                  poster: action.payload.poster,
                  genre: action.payload.genre,
                  minutes: action.payload.minutes,
                  revenue: action.payload.revenue,
                  tagline: action.payload.tagline,
                  status: action.payload.status,
                  budget: action.payload.budget,
                  production_companies: action.payload.production_companies,
                  production_countries: action.payload.production_countries,
                  rated: action.payload.rated,
               },
               fetching: true,
         };
      case RATE_MOVIE:
         return {
            ...state,
            movie : {
               ...state.movie,
               rated: true,
            }
         };
      case ADD_SIMILAR:
         return {
            ...state,
            similar_movies: [...action.payload.similar_movies],
               fetching: true,
         };
      default:
         return {
            ...state
         }
   }
}

const showData = (data) => {
   return {
      type: ADD_EXACT_MOVIE,
      payload: {
         id: data.id,
         title: data.title ? data.title : data.original_name,
         date: data.release_date ? data.release_date : data.first_air_date,
         popularity: data.popularity,
         rate: data.vote_average,
         totalVote: data.vote_count,
         overview: data.overview,
         backdrop: data.backdrop_path,
         poster: data.poster_path,
         genre: data.genres,
         minutes: data.runtime ? data.runtime : data.episode_run_time,
         revenue: data.revenue,
         tagline: data.tagline,
         budget: data.budget,
         production_companies: data.production_companies,
         production_countries: data.production_countries,
         status: data.status,
         rated: false,
      }
   }
}

const addSimilar = (arr) => {
   return {
      type: ADD_SIMILAR,
      payload: {
         similar_movies: arr
      }
   }
}


export const getSimilar = (id) => {
   return async (dispatch) => {
      try {
         const response = await getSimilarMovies(id);
         const data = response.data.results;
         dispatch(addSimilar(data));
      } catch (error) {
         throw new Error(error);
      }
   }
}


export const getExactMovie = (id) => {
   return async (dispatch) => {
      try {
         const response = await getExactMovieInfo(id);
         const data = response.data;
         dispatch(showData(data));
      } catch (error) {
         throw new Error(error);
      }
   }
}


export const getSerialSimilar = (id) => {
   return async (dispatch) => {
      try {
         const response = await getExactSerial(id);
         const data = response.data;
         dispatch(showData(data));
      } catch (error) {
         throw new Error(error);
      }
   }
}

export const getSerialExact = (id) => {
   return async (dispatch) => {
      try {
         const response = await getSimilarSerials(id);
         const data = response.data.results;
         dispatch(addSimilar(data));
      } catch (error) {
         throw new Error(error);
      }
   }
}

const rateMovie = () => {
   return {
      type: RATE_MOVIE,
   }
}

export const rateMovieThunk = ({
   value,
   movie_id,
   guest_session,
   user_session
}) => {
   return async (dispatch) => {
      try {
         const {
            data
         } = await rateMovieRequest({
            value,
            movie_id,
            guest_session,
            user_session
         });
         if (data.success) {
            dispatch(rateMovie());
         }
      } catch (e) {
         console.error(e)
      }
   }
}