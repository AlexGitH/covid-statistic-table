import './App.css';
import CovidTable from './components/CovidTable';
import CountryDetailsModal from './components/CountryDetailsModal';
import Logo from './components/Logo';
import Search from './components/Search';

function* getColumnGenerator( current=0, step=1 ) {
  while( true ){
    yield {
      dataIndex:`header${current}`,
      title : `HEADER_${current}`
    };
    current += step;
  }
}


const getColumnConfig = getColumnGenerator( 0 );

const columns = Array.from({
  length : 4
}, ()=>getColumnConfig.next().value )

function App() {

  return (
    <div className="App">
      <CountryDetailsModal />
      <div className="table-top">
        <Logo />
        <h1>STATISTIC</h1>
        <Search />
      </div>
      <CovidTable columns={columns}/>
    </div>
  );
}

export default App;
