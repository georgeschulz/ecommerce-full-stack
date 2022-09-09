import './cartItem.css';
import trash from '../../assets/icons/trash.png';
import { deleteCartItem } from '../../api/cart';
import { useDispatch } from 'react-redux';
import { updateMostRecentItem } from '../../features/cart';

function CartItem({serviceName, serviceDescription, billingType, setupFee, billingAmount, cartId}) {
    const dispatch = useDispatch();

    const handleClick = async () => {
        try {
            await deleteCartItem(cartId);
            dispatch(updateMostRecentItem({mostRecentItem: "delete-" + cartId}))
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="cart-item">
            <div className='cart-header-row'>
                <h4>{serviceName}</h4>
                <div className='delete-button' onClick={() => handleClick()}>
                    <span className='hidden-mobile'>Delete from Cart</span>
                    <img src={trash} className="trash-icon" />
                </div>
            </div>
            <p>
                {serviceDescription}
            </p>
            <p><b>${setupFee} Setup Fee then ${billingAmount} per {billingType}</b></p>

        </div>
    )
}

export default CartItem;