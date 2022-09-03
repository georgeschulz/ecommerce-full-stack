import Nav from "../../components/nav/nav";
import { useEffect, useState } from "react";
import { getOrderByStripeSession } from "../../api/order";
import { useSearchParams } from "react-router-dom";

function ConfirmationPage() {
    const [searchParams] = useSearchParams()
    const session_id = searchParams.get('session_id');
    const [order, setOrder] = useState({});
    const [date, setDate] = useState(null);
    
    useEffect(() => {
        (async () => {
            const response = await getOrderByStripeSession(session_id);
            setOrder(response.data);
            const dateScheduled = new Date(response.data.date_scheduled);
            setDate(dateScheduled.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}));
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
                <p>A copy of your receipt has been sent to your email at {order.email}.</p>
                <div className="information-box-wide">
                    <h2>{date} <span className="confirmed">Confirmed</span></h2>
                    <div className="order-information-main-content">
                        <div className="order-information">
                            <div className="order-info-box">
                                <p><b>Name: </b> {order.first_name} {order.last_name}</p>
                            </div>
                            <div className="order-info-box">
                                <p><b>Location: </b> {order.address} {order.city}, {order.state} {order.zip}</p>
                            </div>
                            <div className="order-info-box">
                                <p><b>Contact Information: </b> {order.email} | {order.phone} </p>
                            </div>
                            <div className="order-info-box">
                                <p><b>Paid Today: </b>${order.amount_paid/100}</p>
                            </div>
                        </div>
                        <div className="technician-tile">
                            <img src={`/images/techs/${order.tech_profile_pic}`} className='tech-photo-large' />
                            <p>{order.tech_first_name} {order.tech_last_name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPage;