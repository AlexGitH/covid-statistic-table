import './App.css';

import CovidTable from './components/CovidTable';
import CountryDetailsModal from './components/CountryDetailsModal';
import Logo from './components/Logo';
import Search from './components/Search';

import store from './redux/store';
import {Provider, connect}   from 'react-redux';
import {
  actionLoadCovidData,
  // actionSortCovidTableAsc,
  // actionSortCovidTableDesc  
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
  countries: state.promise.countries?.payload,
  error: state.promise.countries?.error?.toString(),
// }), dispatch=>({
//   sortAsc  : dataIndex=>dispatch( actionSortCovidTableAsc( dataIndex ) ),
//   sortDesc : dataIndex=>dispatch( actionSortCovidTableDesc( dataIndex ) )
// }))(CovidTable);
}))(CovidTable);

store.dispatch( actionLoadCovidData() )


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
