import './style.css';
import loading from './loading-tr.gif'

const Preloader = ()=><img className="loader" src={loading} alt="Loading..." />
const Error = ( {text} )=><h1 className="error">{text}</h1>

const CovidTable = ({countries, visibleCountries, error, sortingField, columns, sortField})=>{
  return (
    error != null
      ? <Error text={error} />
      : Array.isArray(visibleCountries)
        ? <>
            <table className="CovidTable">
                <thead>
                    <tr>{ columns.map( ({dataIndex,title}) => ( <th key={dataIndex} onClick={ () => sortField(countries,dataIndex,sortingField ) }>{title}</th>))}</tr>
                </thead>

                <tbody>
                    {visibleCountries // .map(({ID,Index,Country,TotalConfirmed, TotalDeaths, TotalRecovered})=>{
                      .map(({ID,...rest}) => <tr key={ID}>
                                               {columns.map(({dataIndex})=><td key={dataIndex}>{rest[dataIndex]}</td>)}
                                             </tr>)
                    }
                </tbody>
            </table>
          </>
        : <Preloader />
  );
}

export default CovidTable;
