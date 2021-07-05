import './App.css';
import React, { useState, useEffect } from 'react'

import CovidTable from './components/CovidTable';
import CountryDetailsModal from './components/CountryDetailsModal';
import Logo from './components/Logo';
import Search from './components/Search';
import loading from './loading-tr.gif';

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

// const getColumnConfig = getColumnGenerator( 0 );

// const columns = Array.from({
//   length : 3
// }, ()=>getColumnConfig.next().value )

const Preloader = ()=><img className="loader" src={loading} alt="Loading..." />

function App() {
  const [countries, setCountries] = useState([]);

  useEffect( () => {
    const fetchCountries = async() => {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      try {
        const response = await fetch( 'https://api.covid19api.com/summary', requestOptions )
        const orderedCountries = (await response.json()).Countries.map((x,i)=>({...x, Index: i + 1 }));
        setCountries( orderedCountries );
      }
      catch (error) {
        throw error;
      }
    }

    fetchCountries();
  }, [])


  return (
    <div className="App">
      { countries.length > 1 ?
        <>
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
