import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { combineReducers } from "redux";
import { SlickReducer } from './SlickReducer';
import { SectionReducer } from './SectionReducer';
import { MovieReducer } from './MovieReducer';
import { SerialReducer } from './SerialReducer';
import { ActorsReducer } from "./ActorsReducer";
import { MovieCardReducer } from './MovieCardReducer';
import { PopUpReducer } from "./PopUpReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

let rootReducer = combineReducers({
   SlickReducer,
   SectionReducer,
   MovieReducer,
   SerialReducer,
   ActorsReducer,
   MovieCardReducer,
   PopUpReducer,
});

let store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

window.store = store;
export default store;