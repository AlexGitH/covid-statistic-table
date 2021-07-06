import './style.css';
import loading from './loading-tr.gif'

const Preloader = ()=><img className="loader" src={loading} alt="Loading..." />
const Error = ( {text} )=><h1 className="error">{text}</h1>

const CovidTable = ({countries,error,columns})=>{
  return (
    error != null
      ? <Error text={error} />
      : Array.isArray(countries) && countries.length > 1
        ? <>
            <table className="CovidTable">
                <thead>
                    <tr>{ columns.map( ({dataIndex,title}) => ( <th key={dataIndex}>{title}</th>))}</tr>
                </thead>

                <tbody>
                    {countries // .map(({ID,Index,Country,TotalConfirmed, TotalDeaths, TotalRecovered})=>{
                      .map(({ID,...rest})=>{
                        return (
                          <tr key={ID}>
                            {columns.map(({dataIndex})=><td key={dataIndex}>{rest[dataIndex]}</td>)}
                          </tr>
                        )
                      })}
                </tbody>
            </table>
          </>
        : <Preloader />
  );
}

export default CovidTable;
