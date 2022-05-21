import {
   GET_USER_INFO
} from './types';

import {
   getUserInfo
} from '../api/api';

const initialState = {
   success : false,
}

const UserReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_USER_INFO:
         return {
            success : true,
            ...action.payload.data
         };
      default:
         return {
            ...state
         }
   }
}

const getUser = (data) => {
   return {
      type: GET_USER_INFO,
      payload: data
   }
}

export const getUserInfoThunk = ({
   session_id
}) => {
   return async (dispatch) => {
      try {
         const data = await getUserInfo({
            session_id
         });
         if (data) {
            dispatch(getUser(data));
         }
      } catch (e) {
         console.error(e);
      }
   }
}



export default UserReducer;