import {
  FILTER_COVID_DATA,
  PROMISE,
  SET_COVID_DATA,
  SORT_COVID_DATA_ASC,
  SORT_COVID_DATA_DESC,
  SHOW_COUNTRY_DETAILS,
  HIDE_COUNTRY_DETAILS,
  SET_COUNTRY_DETAILS_DATA,
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


const actionSetCovidData = countries => ({ type: SET_COVID_DATA, countries });


const getSortType = ( dataIndex, sortingDataIndex, isDesc ) => {
  return dataIndex === sortingDataIndex && isDesc
          ? SORT_COVID_DATA_DESC
          : SORT_COVID_DATA_ASC;
  // return dataIndex === sortingDataIndex
  //         ? isDesc
  //           ? SORT_COVID_DATA_DESC
  //           : SORT_COVID_DATA_ASC
  //         : SORT_COVID_DATA_ASC;
}

const actionSortCovidTable = ( countries, dataIndex, sortingDataIndex, isDesc=false ) => ({
  type: getSortType( dataIndex, sortingDataIndex, !isDesc ),
  countries,
  dataIndex,
})

const actionLoadCovidData = () => async dispatch => {
  const countriesPromise = fetchCountries()
              .then( countries => countries.map( ( x, i ) => ({...x, Index: i + 1 })) );
  return await dispatch( actionPromise( 'countries', countriesPromise ) );
}

const actionFullLoadCovidData = () => async dispatch => {
  const countries = await dispatch( actionLoadCovidData() )
  if( Array.isArray( countries ) ) {
    dispatch( actionSetCovidData( countries ) );
  }
};

const actionFilterCovidData = ( countries, search ) => ({
  type: FILTER_COVID_DATA, countries, search
})
const actionShowCountryDetails = () => ({ type: SHOW_COUNTRY_DETAILS });
const actionHideCountryDetails = () => ({ type: HIDE_COUNTRY_DETAILS });
const actionSetCountryDetailsData = ({Country, TotalConfirmed, TotalDeaths, TotalRecovered}) => ({
  type: SET_COUNTRY_DETAILS_DATA, Country, TotalConfirmed, TotalDeaths, TotalRecovered
});

export {
  actionPromise,
  actionFullLoadCovidData,
  actionSortCovidTable,
  actionFilterCovidData,
  actionShowCountryDetails,
  actionHideCountryDetails,
  actionSetCountryDetailsData,
}