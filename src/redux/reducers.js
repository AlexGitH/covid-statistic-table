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

const getSortedCountiresState = (countries, dataIndex, isDesc) => ({
  visibleCountries : [...countries].sort( getComparator( dataIndex, isDesc ) ),
  sortingField : { dataIndex, isDesc }
})

const covidTableReducer = ( state={ visibleCountries:[], sortingField:{}, search:'' }, { type, search, countries, dataIndex }) =>{
  const {dataIndex:sortingDataIndex, isDesc } = state.sortingField;
  if ( type === FILTER_COVID_DATA ) {
    const filterFn = ({Country})=>Country.toLowerCase().indexOf( search.toLowerCase() ) === 0 
    return  {
      ...state, 
      visibleCountries: search.length > state.search.length
                          ? state.visibleCountries.filter(filterFn)
                          : Array.isArray( countries )
                            ? [...countries].sort( getComparator( sortingDataIndex, isDesc ) ).filter(filterFn)
                            : [],
      search,
    }
  }
  
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

export {
  promiseReducer as promise,
  covidTableReducer as covidTable,
}


