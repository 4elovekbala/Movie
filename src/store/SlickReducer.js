import {
   ADD_TO_SLICK
} from './types';
import {
   getSlickMovies
} from '../api/api';
let initialState = {
   slider: []
};

export const SlickReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_TO_SLICK:
         return {
            slider: [...action.payload.movies]
         };
      default:
         return {
            ...state
         }
   }
}


const addMoviesToSlider = (arr) => {
   return {
      type: ADD_TO_SLICK,
      payload: {
         movies: arr
      }
   }
}


export const addMoviesToSliderThunk = () => {
   return async (dispatch) => {
      try {
         const response = await getSlickMovies();
         const data = response.data.results;
         dispatch(addMoviesToSlider(data));
      } catch (error) {
         throw new Error(error);
      }
   }
}