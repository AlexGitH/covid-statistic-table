import {
  PROMISE,
  SET_COVID_DATA,
  SORT_COVID_DATA_ASC,
  SORT_COVID_DATA_DESC
} from './actionTypes';

import fetchCountries from '../api/covidApi';
// import CountryDetailsModal from '../components/CountryDetailsModal';

// promise
const actionPending = name => ( { type: PROMISE, status: 'PENDING', name } )
const actionResolved = ( name, payload ) => ( { type: PROMISE, status: 'RESOLVED', payload, name } )
const actionRejected = ( name, error ) => ( { type: PROMISE, status: 'REJECTED', error, name } )

const actionPromise = ( name = 'default', p = Promise.resolve() ) =>
  async dispatch => {
    dispatch( actionPending( name ) )
    try {
      const payload = await p
      dispatch( actionResolved( name, payload ) )
      return payload
    } catch ( error ) {
      dispatch( actionRejected( name, error ) )
    }
  }


const actionFetchCounties = () => async dispatch => dispatch( actionPromise( 'countries', fetchCountries() ) );

const actionSetCovidData = countries => ({ type: SET_COVID_DATA, countries });



// sort
function compareDesc( a, b) {
  return a > b ?  1 : 
         a < b ? -1 : 0;
}

function compareAsc( a, b ) {
  return compareDesc( b, a );
}

function getComparator( propToCompare, isDesc=true ) {
  const comparator =  !isDesc ? compareAsc: compareDesc;
  return (countryA,countryB)=>comparator( countryA[propToCompare], countryB[propToCompare] );
}

const actionSortCovidTableAsc = dataIndex => ({ type: SORT_COVID_DATA_ASC, dataIndex });
const actionSortCovidTableDesc = dataIndex => ({ type: SORT_COVID_DATA_DESC, dataIndex });

const actionLoadCovidData = () => async dispatch => {
  // return await dispatch( actionPromise( 'countries', fetchCountries() ) );

  const p = fetchCountries()
              .then( countries => countries.map( ( x, i ) => ({...x, Index: i + 1 })) );
  return await dispatch( actionPromise( 'countries', p ) );
}

// const actionLoadCovidData = () => async dispatch => {
//   try {
//     const countries = await dispatch( actionFetchCounties() );
//     if ( Array.isArray( countries ) && countries.length > 0 ) {
//       const orderedCountries = countries.map( ( x, i ) => ({...x, Index: i + 1 }));
//       dispatch( actionSetCovidData( orderedCountries ) );
//     }
//     else {
//       dispatch( actionSetCovidData( [] ) );
//     }
//   }
//   catch ( err ) {
//     const text = err.toString();
//     // setError( text );
//   }

// }
export {
  actionPromise,
  actionLoadCovidData,
  actionSortCovidTableAsc,
  actionSortCovidTableDesc,
}