import React, { useState } from 'react';
import './style.css';
import scope from './scope.svg';


const Search = () => {
  const [search, setSearch] = useState('');

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
