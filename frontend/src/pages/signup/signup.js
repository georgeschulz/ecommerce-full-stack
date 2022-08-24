import Nav from "../../components/nav/nav";
import SignupForm from "../../components/signupForm.js/signupForm";

function SignupPage() {
    return (
       <div>
            <Nav
                homeNav="store" 
                showSolution={false}
                showServices={false}
                showAccountSettings={true}
            />
            <SignupForm />
       </div>
    )
}

export default SignupPage;