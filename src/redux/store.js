import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { promise, covidTable } from './reducers';


const store = createStore( combineReducers( {
  promise,
  covidTable,
} ), applyMiddleware( thunk ) )

window.store = store  // DEBUG: for test only

export default store;
