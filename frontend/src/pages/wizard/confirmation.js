import Nav from "../../components/nav/nav";

function ConfirmationPage() {
    return (
        <div>
            <Nav
                homeNav="store"
                showSolution={true}
                showServices={true}
                showAccountSettings={true}
            />
            <header>
                <h1>Your Order Has Been Placed</h1>
                <p>A copy of your receipt has been sent to your email at georgeschulz33@gmail.com.</p>
                
            </header>
        </div>
    )
}

export default ConfirmationPage;