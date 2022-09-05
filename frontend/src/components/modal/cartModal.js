import Modal from "./modal";
import { useSelector } from "react-redux";
import { selectShowCartModal } from "../../features/cart";
import { toggleCartModal } from "../../features/cart";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { selectCart } from "../../features/cart";
import { updateMostRecentItem } from "../../features/cart";
import { selectMostRecentItem } from "../../features/cart";
import { getCartContents } from "../../api/cart";
import { updateCart } from "../../features/cart";
import { selectIsCartEmtpy } from "../../features/cart";
import CartItem from "../cartItem/cartItem";

function CartModal() {
    const showModal = useSelector(selectShowCartModal);
    const cart = useSelector(selectCart);
    const isCartEmpty = useSelector(selectIsCartEmtpy)
    //get the most recent item to force re-render of cart state from db anytime an item is added to the cart
    const mostRecentItem = useSelector(selectMostRecentItem);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const response = await getCartContents();
                dispatch(updateCart({cart: response.data}));
            } catch (e) {
                dispatch(updateCart({cart: []}))
            }
            
        })();
    }, [mostRecentItem]);

    return (
        <Modal
            show={showModal}
            toggleModal={toggleCartModal}
        >
            <h2>My Cart</h2>
            {isCartEmpty
                ? (<div className="cart-contents-container">
                    <div className="error-box">It looks like your cart is empty right now.</div>
                  </div>)
                : (<div className="cart-contents-container">
                    {cart.map((item, i) => {
                        return (
                            <CartItem
                                serviceName={item.service_name}
                                billingType={item.billing_type}
                                billingAmount={item.billing_amount}
                                serviceDescription={item.description}
                                setupFee={item.setup_fee}
                                cartId={item.cart_id}

                            />
                        )
                    })}
                  </div>)
            }
        </Modal>
    );
}

export default CartModal;