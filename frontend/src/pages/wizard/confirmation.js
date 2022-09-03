import Nav from "../../components/nav/nav";
import { useEffect, useState } from "react";
import { getOrderByStripeSession } from "../../api/order";
import { useSearchParams } from "react-router-dom";
import ItemDetails from "../../components/itemDetails/item";

function ConfirmationPage() {
    const [searchParams] = useSearchParams()
    const session_id = searchParams.get('session_id');
    const [order, setOrder] = useState({ test: 'test', items: [1] });
    const [date, setDate] = useState(null);

    useEffect(() => {
        (async () => {
            const response = await getOrderByStripeSession(session_id);
            setOrder(response.data);
            const dateScheduled = new Date(response.data.date_scheduled);
            setDate(dateScheduled.toLocaleString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
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
                    <div className="wide-info-box-left">
                        <h2 className="left-h2">{date} <span className="confirmed">Confirmed</span></h2>
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
                                    <p><b>Paid Today: </b>${order.amount_paid / 100}</p>
                                </div>
                            </div>
                        </div>
                        <h3>Items</h3>
                        <br />
                        {order.items.map(item => {
                                return (
                                    <ItemDetails
                                        serviceName={item.service_name}
                                        freq={item.frequency}
                                        billingAmount={item.billing_amount}
                                        billingType={item.billing_type}
                                    />
                                )
                            })}
                    </div>
                    <div className="technician-tile">
                        <img src={`/images/techs/${order.tech_profile_pic}`} className='tech-photo-large' />
                        <p>{order.tech_first_name} {order.tech_last_name}</p>
                    </div>
                </div>
                <div className="box-row-container">
                    <div className="medium-box">
                        <h2 className="left-h2">Need to Reschedule?</h2>
                        <p>Please contract our office directly for any scheduling changes. Additionally, if you have special requests in terms of timing, please reach out to our office to see if we can accomodate you.</p>
                        <br />
                        <p><b>Phone: </b>(123) - 123 - 1231    |    <b>Email</b>: Info@abcpest.com</p>
                    </div>
                    <div className="medium-box">
                        <h2 className="left-h2">The Better Promise</h2>
                        <p>We believe customers expect prompt, friendly and effective service. If you are ever unhappy with your service, your plan covers unlimited free callbacks in between services. If we can't find a way to make you happy, you can cancel at anytime. </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationPage;