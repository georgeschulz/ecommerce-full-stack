import check from '../../assets/check-no-radius.png'

function ItemDetails({serviceName, freq, billingAmount, billingType}) {
    return (
        <div className="item-details">
            <p><b>Item</b>: {serviceName}</p>
            <p><b>Frequency</b>: {freq}</p>
            <p><b>Cost</b>: ${billingAmount} / {billingType}</p>
            <p><img src={check} className="confirmed-check" alt="check mark" /><b>Setup Fee Paid</b></p>
        </div>
    )
}

export default ItemDetails;