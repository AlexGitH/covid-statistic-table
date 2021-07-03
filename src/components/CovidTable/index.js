import './style.css';

const CovidTable = ({countries,columns})=>{
  
  console.log('CovidTable:', 'columns:', columns);
  return (

    <table className="CovidTable">
        <thead>
            <tr>{ columns.map( ({dataIndex,title}) => ( <th key={dataIndex}>{title}</th>))}</tr>
        </thead>

        <tbody>
            <tr>
                <td>cell1_1</td>
                <td>cell2_1</td>
                <td>cell3_1</td>
                <td>cell4_1</td>
            </tr>
            <tr>
                <td>cell1_2</td>
                <td>cell2_2</td>
                <td>cell3_2</td>
                <td>cell4_2</td>
            </tr>
            <tr>
                <td>cell1_3</td>
                <td>cell2_3</td>
                <td>cell3_3</td>
                <td>cell4_3</td>
            </tr>
            <tr>
                <td>cell1_4</td>
                <td>cell2_4</td>
                <td>cell3_4</td>
                <td>cell4_4</td>
            </tr>
        </tbody>
    </table>
  )
}

export default CovidTable;
