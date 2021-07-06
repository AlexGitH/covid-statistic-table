import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { promise } from './reducers';


const store = createStore( combineReducers( {
  promise,
} ), applyMiddleware( thunk ) )

window.store = store  // DEBUG: for test only

export default store;
