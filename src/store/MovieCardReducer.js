import {
   ADD_EXACT_MOVIE,
   ADD_SIMILAR
} from './types';

import {
   getExactMovieInfo,
   getSimilarMovies,
   getExactSerial,
   getSimilarSerials,
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
               },
               fetching: true,
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
   return (dispatch) => {
      getSimilarMovies(id).then(response => {
         dispatch(addSimilar(response.data.results))
      })
   }
}


export const getExactMovie = (id) => {
   return (dispatch) => {
      getExactMovieInfo(id).then(response => {
         dispatch(showData(response.data))
      })
   }
}


export const getSerialSimilar = (id) => {
   return (dispatch) => {
      getExactSerial(id).then(response => {
         dispatch(showData(response.data))
      })
   }
}

export const getSerialExact = (id) => {
   return (dispatch) => {
      getSimilarSerials(id).then(response => {
         dispatch(addSimilar(response.data.results))
      })
   }
}