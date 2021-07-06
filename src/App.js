import './App.css';
import React, { useState, useEffect } from 'react'

import CovidTable from './components/CovidTable';
import CountryDetailsModal from './components/CountryDetailsModal';
import Logo from './components/Logo';
import Search from './components/Search';
import loading from './loading-tr.gif';

import fetchCountries from './api/covidApi'

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

const Preloader = ()=><img className="loader" src={loading} alt="Loading..." />
const Error = ( {text} )=><h1 className="error">{text}</h1>

function App() {
  const [countries, setCountries] = useState( [] );
  const [error, setError] = useState( null )

  useEffect( () => {
    fetchCountries({setError,setCountries});
  }, [])


  return (
    <div className="App">
      { error != null
        ? <Error text={error} />
        : countries.length > 1
          ? <>
              {isDetailsVisible && <CountryDetailsModal />}
              <div className="table-top">
                <Logo />
                <h1>STATISTIC</h1>
                <Search />
              </div>
              <CovidTable countries={countries} columns={columnConfigs}/>
            </>
          : <Preloader />
      }
    </div>
  );
}

export default App;
