import Nav from "../../components/nav/nav";
import { useEffect, useState } from "react";
import { getOrderByStripeSession } from "../../api/order";
import { useSearchParams } from "react-router-dom";

function ConfirmationPage() {
    const [searchParams] = useSearchParams()
    const session_id = searchParams.get('session_id');
    const [order, setOrder] = useState({});
    
    useEffect(() => {
        (async () => {
            const response = await getOrderByStripeSession(session_id);
            setOrder(response.data)
        })();
    }, [])

    return (
        <div>
            <Nav
                homeNav="store"
                showSolution={true}
                showServices={true}
                showAccountSettings={true}
            />
            <div className="wizard-content-container">
                <h1>Your Order Has Been Placed</h1>
                <p>A copy of your receipt has been sent to your email at georgeschulz33@gmail.com.</p>
                <p>Name: {order.first_name} {order.last_name}</p>
        
            </div>
        </div>
    )
}

export default ConfirmationPage;