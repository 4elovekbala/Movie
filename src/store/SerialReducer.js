import {
   POPULAR_SERIALS,
   SORT_BY_NAME,
   SORT_BY_VOTE,
   SORT_BY_POPULARITY,
   RESET_SORT
} from './types';

import {
   getPopularSerials
} from '../api/api';

const initialState = {
   serials: {
      "array": []
   },
};


export const SerialReducer = (state = initialState, action) => {
   switch (action.type) {
      case POPULAR_SERIALS:
         let concat = [...state.serials.array, ...action.payload.array];
         var unique = Array.from(new Set(concat.map(JSON.stringify))).map(JSON.parse);
         return {
            ...state,
            serials: {
               array: [...unique],
               isFetching: true,
            },
         };
      case SORT_BY_NAME:
         return {
            ...state,
            serials: {
               array: state.serials.array.map(a => a).sort((a, b) => a.original_name.localeCompare(b.original_name)),
               isFetching: true,
            }
         };
      case SORT_BY_VOTE:
         return {
            ...state,
            serials: {
               array: state.serials.array.map(a => a)
                  .sort((a, b) => parseFloat(b.vote_average) - parseFloat(a.vote_average)),
               isFetching: true,
            }
         };
      case SORT_BY_POPULARITY:
         return {
            ...state,
            serials: {
               array: state.serials.array.map(a => a)
                  .sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)),
               isFetching: true,
            }
         };
      case RESET_SORT:
         return {
            ...state,
            serials: {
               array: state.serials.array.map(a => a).sort(),
               isFetching: true,
            }
         };
      default:
         return {
            ...state,
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
   return async (dispatch) => {
      try{
         const response = await getPopularSerials(page);
         const data = response.data.results;
         dispatch(addPopularSerials(data));
      }
      catch(error){
         throw new Error(error);
      }
   }
}