import { useState } from "react";
import Styles from "../../styles/Styles";

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    return (
        <form className="flex flex-col">
            <text className="text-3xl font-bold mb-4">Sign Up</text>
            <label className={Styles.inputLabel}>Email</label>
            <input type="text" value={formData.email} placeholder="Email" className={Styles.formInput}/>

            <label className={Styles.inputLabel}>Password</label>
            <input type="password" value={formData.password} placeholder="Password" className={Styles.formInput}/>
        </form>
    );
};

export default SignUpForm;