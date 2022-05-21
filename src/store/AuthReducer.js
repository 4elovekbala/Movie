import {
   GET_USER,
   GET_GUEST,
   USER_FETCHING,
   GET_REQUEST_TOKEN,
   GET_SESSION_ID,
} from './types';

import {
   createSession,
   getSessionForGuest,
   getUserRequest,
} from '../api/api';


const initialState = {
   isFetching: false,
   request_token: '',
   user: {
      success: false,
   },
   guest: {
      success: false,
   },
   session_id: {},
};

export const AuthReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_GUEST:
         return {
            ...state,
            guest: action.payload.guest
         };
      case USER_FETCHING:
         return {
            ...state,
            isFetching: action.paylaod.fetching,
         };
      case GET_USER:
         return {
            ...state,
            user: action.payload.user,
               isFetching: false,
         };
      case GET_REQUEST_TOKEN:
         return {
            ...state,
            request_token: action.payload.request_token,
         };
      case GET_SESSION_ID:
         return {
            ...state,
            session_id: action.payload.session_id,
         };
      default:
         return {
            ...state,
         }
   }
}

export const getUser = (user) => {
   return {
      type: GET_USER,
      payload: {
         user
      }
   }
}


export const getUserThunk = ({
   username,
   password,
   request_token,
}) => {
   return async (dispatch) => {
      try {
         const {
            data
         } = await getUserRequest({
            username,
            password,
            request_token,
         });
         if (data) {
            dispatch(getUser(data));
         }
      } catch (e) {
         console.error(e)
      }
   }
}

export const getGuest = (guest) => {
   return {
      type: GET_GUEST,
      payload: {
         guest
      }
   }
}

export const getGuestThunk = () => {
   return async (dispatch) => {
      try {
         const {
            data
         } = await getSessionForGuest();
         dispatch(getGuest(data));
      } catch (e) {
         console.error(e)
      }
   }
}


export const getRequestToken = ({
   request_token
}) => {
   return {
      type: GET_REQUEST_TOKEN,
      payload: {
         request_token
      }
   }
}


const getSessionId = (session_id) => {
   return {
      type: GET_SESSION_ID,
      payload: {
         session_id,
      }
   }
}

export const getSessionIdThunk = ({
   request_token
}) => {
   return async (dispatch) => {
      try {
         const { data }  = await createSession({request_token});
         if(data){
            dispatch(getSessionId(data))
         }
      } catch (e) {
         console.error(e);
      }
   }
}