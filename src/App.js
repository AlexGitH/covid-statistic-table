import './App.css';

import CovidTable from './components/CovidTable';
import CountryDetailsModal from './components/CountryDetailsModal';
import Logo from './components/Logo';
import Search from './components/Search';

import store from './redux/store';
import {Provider, connect}   from 'react-redux';
import {
  actionFilterCovidData,
  actionFullLoadCovidData,
  actionSortCovidTable,
} from './redux/actions';

const isDetailsVisible = false;

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
}))(CovidTable);

const CSearch= connect(state=>({
  search   : state.covidTable.search,
  countries: state.promise.countries?.payload,
}), dispatch=>({
  filterCovidTable: (countries, search ) =>
                 dispatch( actionFilterCovidData( countries, search ) ),
}))(Search);

store.dispatch( actionFullLoadCovidData() )

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {
          <>
            {isDetailsVisible && <CountryDetailsModal />}
            <div className="table-top">
              <Logo />
              <h1>STATISTIC</h1>
              <CSearch />
            </div>
            <CCovidTable columns={columnConfigs}/>
          </>
        }
      </div>
    </Provider>
  );
}

export default App;
