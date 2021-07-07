import './style.css';
import confirmed from './confirmed.svg';
import deaths from './deaths.svg';
import recovered from './recovered.svg';


const CountryDetailsModal = ({ isVisible, data: { Country, TotalConfirmed, TotalDeaths, TotalRecovered } , onOk })=>{
  const details = [
    [confirmed,'Total Confirmed', TotalConfirmed],
    [deaths,'Total Deaths', TotalDeaths],
    [recovered,'Total Recovered', TotalRecovered]
  ]
  return (
    <>
    {isVisible &&
    <div className="CountryDetailsModal">
      <div className="country-modal-content">
        <div className="country-modal-header">
          <h4>{Country}</h4>
        </div>
        <div className="country-modal-body">
          <table>
            <tbody>
              {details.map(([ico,prop,number])=><tr key={prop}>
                <td>
                  <img src={ico} alt={prop}/>
                </td>
                <td>{prop}</td>
                <td>{number}</td></tr>)}
            </tbody>
          </table>
        </div>
        <div className="country-modal-footer">
          <button onClick={onOk}>OK</button>
        </div>
      </div>
    </div>
    }
    </>
  );
}

export default CountryDetailsModal;