import Nav from "../../components/nav/nav";

function Settings() {
    return (
        <div>
           <Nav
                homeNav="store"
                showSolution={true}
                showServices={true}
                showAccountSettings={true}
            />
            <h2>Settings</h2>
        </div>
    )
}

export default Settings;