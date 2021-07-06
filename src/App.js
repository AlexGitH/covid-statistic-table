import './App.css';

import CovidTable from './components/CovidTable';
import CountryDetailsModal from './components/CountryDetailsModal';
import Logo from './components/Logo';
import Search from './components/Search';

import store from './redux/store';
import {Provider, connect}   from 'react-redux';
import {
  actionFullLoadCovidData,
  actionHideCountryDetails,
  actionSetCountryDetailsData,
  actionShowCountryDetails,
  actionSortCovidTable,
} from './redux/actions';

const columnConfigs = [{
  dataIndex : 'Index',
  title     : '№'
},{
  dataIndex : 'Country',
  title     : 'Country'
},{
  dataIndex : 'TotalConfirmed',
  title     : 'Total Confirmed'
}];

const CCovidTable= connect(state=>({
  countries       : state.promise.countries?.payload,
  error           : state.promise.countries?.error?.toString(),
  visibleCountries: state.covidTable.visibleCountries,
  sortingField    : state.covidTable.sortingField
}), dispatch=>({
  onSort: (countries, dataIndex, {dataIndex:sortingDataIndex, isDesc } ) =>
                 dispatch( actionSortCovidTable( countries, dataIndex, sortingDataIndex, isDesc ) ),

  onSetDetailsData: country => dispatch( actionSetCountryDetailsData( country ) ),

  onShowDetails : () => dispatch( actionShowCountryDetails() )
}))(CovidTable);

const CCountryDetailsModal= connect(state=>({
  isVisible : state.countryDetails.isCountryDetailsVisible,
  data      : state.countryDetails.data,
}), dispatch=>({
  onOk: () => dispatch( actionHideCountryDetails() ),
}))(CountryDetailsModal);

store.dispatch( actionFullLoadCovidData() )

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {
          <>
            <CCountryDetailsModal  />
            <div className="table-top">
              <Logo />
              <h1>STATISTIC</h1>
              <Search />
            </div>
            <CCovidTable columns={columnConfigs}/>
          </>
        }
      </div>
    </Provider>
  );
}

export default App;
