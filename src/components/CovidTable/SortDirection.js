import './SortDirection.css';

const SortDirection = ({dataIndex, sortingDataIndex, isDesc}) => 
    <div className='sort-direction'>
     {( dataIndex === sortingDataIndex)
        ? isDesc ? '↓' : '↑'
        : <>&nbsp;</>}
     </div> 

export default SortDirection;
