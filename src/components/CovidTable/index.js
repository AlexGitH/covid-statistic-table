import './style.css';

const CovidTable = ({countries,columns})=>{
  
  return (

    <table className="CovidTable">
        <thead>
            <tr>{ columns.map( ({dataIndex,title}) => ( <th key={dataIndex}>{title}</th>))}</tr>
        </thead>

        <tbody>
            {countries
              .map(({ID,Country,TotalConfirmed, TotalDeaths, TotalRecovered},index)=>{
                return (
                  <tr key={ID}>
                    <td>{index + 1}</td>
                    <td>{Country}</td>
                    <td>{TotalConfirmed}</td>
                  </tr>
                )
              })}
        </tbody>
    </table>
  )
}

export default CovidTable;
