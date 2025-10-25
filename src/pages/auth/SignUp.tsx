import Styles from "../../styles/Styles";

// [IMPORT] Components
import SignUpPanel from "../../components/Auth/SignUp/SignUpPanel";

const SignUp = () => {
    document.title = "Snippify: Sign Up"

    return (
        <div className={Styles.signUpPanel}>
            <SignUpPanel/>
        </div>
    );
};

export default SignUp;