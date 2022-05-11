import {
   CLOSE_POP_UP,
   SET_POP_UP
} from './types';

const initialState = {
   popup: false,
};

export const PopUpReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_POP_UP:
         return {
            ...state,
            popup: true,
         };
      case CLOSE_POP_UP:
         return {
            ...state,
            popup: false,
         };
      default:
         return {
            ...state,
         }
   }
}

export const setPopUp = () => {
   return {
      type: SET_POP_UP,
   }
}


export const closePopUp = () => {
   return {
      type: CLOSE_POP_UP,
   }
}