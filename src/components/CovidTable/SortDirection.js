import './SortDirection.css';

const SortDirection = ({dataIndex, sortingDataIndex, isDesc}) => 
    //  ( dataIndex === sortingDataIndex) && <div className='sort-direction'>
    //     {isDesc ? 'v' : '^'}
    //  </div> 

    <div className='sort-direction'>
     {( dataIndex === sortingDataIndex)
        ? isDesc ? '↓' : '↑'
        : <>&nbsp;</>}
     </div> 

export default SortDirection;
