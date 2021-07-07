import './style.css';
import loading from './loading-tr.gif'
import SortDirection from './SortDirection';

const Preloader = ()=><img className="loader" src={loading} alt="Loading..." />
const Error = ( {text} )=><h1 className="error">{text}</h1>

const CovidTable = ({countries, visibleCountries, error, sortingField, columns, onSort,onSetDetailsData, onShowDetails})=>{
  const { dataIndex:sortingDataIndex, isDesc } = sortingField;
  const onCountryClick = country => {
    onSetDetailsData( country );
    onShowDetails();
  };
  return (
    error != null
      ? <Error text={error} />
      : Array.isArray(countries)
        ? <table className="CovidTable">
              <thead>
                  <tr>{ columns.map( ({dataIndex,title}) => (
                    <th key={dataIndex} onClick={ () => onSort(countries,dataIndex,sortingField ) }>
                      <div>
                        <div>
                          <div>
                            {title}
                          </div>
                        </div>
                        <SortDirection
                          className="sort-direction"
                          dataIndex={dataIndex}
                          sortingDataIndex={sortingDataIndex}
                          isDesc={isDesc}
                        />
                      </div>
                      </th>))}
                  </tr>
              </thead>

              <tbody>
                  {visibleCountries 
                    .map(({ID,...rest}) => <tr key={ID}
                                               onClick={()=>onCountryClick( rest )}>
                                             {columns.map(({dataIndex})=><td key={dataIndex}>{rest[dataIndex]}</td>)}
                                           </tr>)
                  }
              </tbody>
          </table>
        : <Preloader />
  );
}

export default CovidTable;
