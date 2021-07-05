import './style.css';
import confirmed from './confirmed.svg';
import deaths from './deaths.svg';
import recovered from './recovered.svg';

// DEBUG: remove after testing
const testData = [
  [confirmed,'Total Confirmed', 132215],
  [deaths,'Total Deaths', 2812],
  [recovered,'Total Recovered', 13230]
]

const CountryDetailsModal = ({details=testData})=>{
  return (
    <div className="CountryDetailsModal">
      <div className="country-modal-content">
        <div className="country-modal-header">
          <h4>Albania</h4>
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
          <button>OK</button>
        </div>
      </div>
    </div>
  );
}

export default CountryDetailsModal;