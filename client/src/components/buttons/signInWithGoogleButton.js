import google from '../../assets/google.webp';
import { useDispatch } from "react-redux";
import { authorize } from '../../features/auth';

function SignInWithGoogleButton() {
    const dispatch = useDispatch();

    const handleGoogleButtonClick = () => {
        (async () => {
            try {
                if(process.env.NODE_ENV === 'production') {
                    dispatch(authorize());
                    window.location.href = 'https://pest-control-ecommerce.herokuapp.com/login/google';
                } else {
                    dispatch(authorize());
                    window.location.href = 'http://localhost:4000/login/google';
                }
            } catch (err) {
                console.log(err)
            }
        })();
    }

    return (
        <div className="form-group row-center">
            <a className="google-button" onClick={() => handleGoogleButtonClick()}>
                <img src={google} />
                <span>Login with Google</span>
            </a>
        </div>
    )
}

export default SignInWithGoogleButton;