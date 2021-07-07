import './style.css';
import scope from './scope.svg';


const Search = ( { search, countries, filterCovidTable} ) => {

  return <div className="Search" >
    <input
    type="text"
    placeholder="Search..."
    value={search}
    onChange={ e => filterCovidTable( countries, e.target.value ) } />
    
    <img src={scope} alt="Search" />
  </div>
}

export default Search;
