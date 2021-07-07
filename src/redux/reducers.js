import { PROMISE, SET_COVID_DATA, SORT_COVID_DATA_ASC, SORT_COVID_DATA_DESC, FILTER_COVID_DATA } from './actionTypes'

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

const getSortedCountriesState = (countries, dataIndex, isDesc) => ({
  visibleCountries : [...countries].sort( getComparator( dataIndex, isDesc ) ),
  sortingField : { dataIndex, isDesc }
})

const getFilterFn = (search, stateSearch) => {
  const searchText= search!=null ? search : stateSearch;
  return ({Country})=> Country.toLowerCase().indexOf( searchText.toLowerCase() ) === 0;
}

const covidTableReducer = ( state={ visibleCountries:[], sortingField:{}, search:'' }, { type, search, countries, dataIndex }) =>{
  const {dataIndex:sortingDataIndex, isDesc } = state.sortingField;
  const filterFn = getFilterFn( search, state.search )
  if ( type === FILTER_COVID_DATA ) {
    return  {
      ...state, 
      search,
      // if search text length greater then previous use previously filtered cuntries from view
      visibleCountries: search.length > state.search.length 
                          ? state.visibleCountries.filter(filterFn)
                          : Array.isArray( countries )
                            ? [...countries].sort( getComparator( sortingDataIndex, isDesc ) ).filter(filterFn)
                            : [],
    }
  }
  
  if ( type === SET_COVID_DATA ) {
    return { ...state, visibleCountries: [...countries] }
  }

  if ( type === SORT_COVID_DATA_ASC ) {
    const filteredCountries = countries.filter(filterFn);
    return { ...state, ...getSortedCountriesState( filteredCountries, dataIndex, false ) }
  }
  
  if ( type === SORT_COVID_DATA_DESC ) {
    const filteredCountries = countries.filter(filterFn);
    return { ...state, ...getSortedCountriesState( filteredCountries, dataIndex, true ) }
  }
  return state;
}

export {
  promiseReducer as promise,
  covidTableReducer as covidTable,
}


