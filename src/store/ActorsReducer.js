import {
   ADD_ACTORS,
   SORT_BY_NAME,
   SORT_BY_POPULARITY,
   RESET_SORT,
} from './types';

import {
   getActors
} from '../api/api';

const initialState = {
   actors: {
      array: []
   },
};


export const ActorsReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_ACTORS:
         let concat = [...state.actors.array, ...action.payload.array];
         var unique = Array.from(new Set(concat.map(JSON.stringify))).map(JSON.parse);
         return {
            ...state,
            actors: {
               array: [...unique],
               isFetching: true,
            },
         };
      case SORT_BY_NAME:
         return {
            ...state,
            actors: {
               array: state.actors.array.map(a => a).sort((a, b) => a.name.localeCompare(b.name)),
               isFetching: true,
            }
         };
      case SORT_BY_POPULARITY:
         return {
            ...state,
            actors: {
               array: state.actors.array.map(a => a)
                  .sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)),
               isFetching: true,
            }
         };
      case RESET_SORT:
         return {
            ...state,
            actors: {
               array: state.actors.array.map(a => a).sort(),
               isFetching: true,
            }
         };
      default:
         return {
            ...state,
         }
   }
}

const addActors = (arr) => {
   return {
      type: ADD_ACTORS,
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
      getActors(page).then(response => {
         dispatch(addActors(response.data.results))
      })
   }
}