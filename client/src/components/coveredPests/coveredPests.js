import './coveredPests.css';

function CoveredPests({pestList}) {
    return (
        <ul className="covered-pests-list">
            {pestList.map((pest, i) => {
                return ( <div key={i} className='list-item-container'><li>{pest}</li></div>)
            })}
        </ul>
    )
}

export default CoveredPests;