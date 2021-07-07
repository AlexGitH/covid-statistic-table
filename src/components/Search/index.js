import React, { useState, useEffect } from 'react';
import './style.css';
import scope from './scope.svg';


const Search = ( {countries, filterCovidTable} ) => {
  const [search, setSearch] = useState('');
  useEffect(() => {
    filterCovidTable( countries, search );
  }, [search] )



  return <div className="Search" >
    <input
    type="text"
    placeholder="Search..."
    value={search}
    onChange={ e => setSearch( e.target.value ) } />
    
    <img src={scope} alt="Search" />
  </div>
}

export default Search;
