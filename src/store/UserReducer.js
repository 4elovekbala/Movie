import {
   GET_USER_INFO,
   DELETE_USER_INFO,
} from './types';

import {
   deleteSession,
   getUserInfo
} from '../api/api';

const initialState = {
   success: false,
}

const UserReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_USER_INFO:
         return {
            success: true,
               ...action.payload.data
         };
      case DELETE_USER_INFO:
         return {
            success: false
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

const deleteUser = () => {
   return {
      type: DELETE_USER_INFO
   }
}

export const deleteUserThunk = ({
   session_id
}) => {
   return async (dispatch) => {
      try {
         const data = await deleteSession({
            session_id
         });
         if (data) {
            dispatch(deleteUser());
         }
      } catch (e) {
         console.error(e);
      }
   }
}



export default UserReducer;