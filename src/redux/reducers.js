import {
  PROMISE,
  SET_COVID_DATA,
  SORT_COVID_DATA_ASC,
  SORT_COVID_DATA_DESC,
  SHOW_COUNTRY_DETAILS,
  HIDE_COUNTRY_DETAILS,
  SET_COUNTRY_DETAILS_DATA,
} from './actionTypes'

// promise
const promiseReducer = ( state = {}, { type, status, payload, error, name } ) =>
  ( type === PROMISE
      ? { ...state, [name]: { status, payload, error } }
      : state )


// covid table

// sort
const compareDesc = ( a, b ) => ( a > b ?  1 : 
                                  a < b ? -1 : 0 );

const compareAsc = ( a, b ) => compareDesc( b, a );

const getComparator = ( propToCompare, isDesc=true ) => {
  const comparator =  isDesc ? compareAsc: compareDesc;
  return (countryA,countryB)=>comparator( countryA[propToCompare], countryB[propToCompare] );
}

const getSortedCountiresState = (countries, dataIndex, isDesc) => ({
  visibleCountries : [...countries].sort( getComparator( dataIndex, isDesc ) ),
  sortingField : { dataIndex, isDesc }
})

const covidTableReducer = ( state={ visibleCountries:[], sortingField:{} }, { type, countries, dataIndex }) =>{
  if ( type === SET_COVID_DATA ) {
    return { ...state, visibleCountries: [...countries] }
  }
  if ( type === SORT_COVID_DATA_ASC ) {
    return { ...state, ...getSortedCountiresState( countries, dataIndex, false ) }
  }
  if ( type === SORT_COVID_DATA_DESC ) {
    return { ...state, ...getSortedCountiresState( countries, dataIndex, true ) }
  }
  return state;
}

const countryDetailsReducer = ( state={ isCountryDetailsVisible: false, data:{} },
                                   { type, Country, TotalConfirmed, TotalDeaths, TotalRecovered } ) => {
  if ( type === SET_COUNTRY_DETAILS_DATA ) {
    return { ...state, data:{ Country, TotalConfirmed, TotalDeaths, TotalRecovered } };
  }
  if ( type === SHOW_COUNTRY_DETAILS ) {
    return { ...state, isCountryDetailsVisible: true };
  }
  if ( type === HIDE_COUNTRY_DETAILS ) {
    return { ...state, isCountryDetailsVisible: false };
  }
  return state;
}

export {
  promiseReducer as promise,
  covidTableReducer as covidTable,
  countryDetailsReducer as countryDetails,
}


