import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { promise, covidTable, countryDetails } from './reducers';


const store = createStore( combineReducers( {
  promise,
  covidTable,
  countryDetails,
} ), applyMiddleware( thunk ) )

export default store;
