import React, { useState } from 'react';
import './style.css';


const Search = () => {
  const [search, setSearch] = useState('');

  return <div className="Search" >
    <input
    type="text"
    placeholder="Search..."
    value={search}
    onChange={ e => setSearch( e.target.value ) } />
    <img src="http://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Crystal_Clear_action_viewmag.png/16px-Crystal_Clear_action_viewmag.png" alt="Search" />
  </div>
}

export default Search;
