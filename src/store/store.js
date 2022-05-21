import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { combineReducers } from "redux";
import { SlickReducer } from './SlickReducer';
import { SectionReducer } from './SectionReducer';
import { MovieReducer } from './MovieReducer';
import { SerialReducer } from './SerialReducer';
import { ActorsReducer } from "./ActorsReducer";
import { MovieCardReducer } from './MovieCardReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AuthReducer } from "./AuthReducer";
import UserReducer from "./UserReducer";

let rootReducer = combineReducers({
   SlickReducer,
   SectionReducer,
   MovieReducer,
   SerialReducer,
   ActorsReducer,
   MovieCardReducer,
   auth : AuthReducer,
   user : UserReducer,
});

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

window.store = store;
export default store;