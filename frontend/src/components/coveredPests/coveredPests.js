import './coveredPests.css';

function CoveredPests({pestList}) {
    return (
        <ul className="covered-pests-list">
            {pestList.map((pest, i) => {
                return ( <div className='list-item-container'><li key={i}>{pest}</li></div>)
            })}
        </ul>
    )
}

export default CoveredPests;