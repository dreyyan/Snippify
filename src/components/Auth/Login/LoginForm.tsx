import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../../../styles/Styles";
import { useModal } from "../../../context/ModalContext";

const SignUpForm = () => {
    const navigate = useNavigate();
    const { openModal } = useModal();

    // States
    const [formData, setFormData] = useState({
        usernameEmail: "dreyyan",
        password: "dreyyan123",
        // usernameEmail: "",
        // password: "",
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);

    // [HANDLE] Show/hide password
    const handleTogglePassword = () => { setShowPassword(prev => !prev); };

    // [HANDLE] Reset password
    const handleForgotPassword = () => {
        openModal({
            type: 'info',
            title: 'Reset your password',
            content: 'We’ll help you reset your password. Please check your inbox for the reset link after confirming.',
            size: 'md'
        });
    };

    // [HANDLE] Input field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // [HANDLE] Process & validate form before registering account
    const handleLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault(); // Prevent page reload

        const { usernameEmail, password, rememberMe } = formData;

        // [ERROR] Missing input fields
        if (!usernameEmail || !password) {
            alert("Please fill in both fields.");
            return;
        }

        // Call backend login API
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ usernameEmail, password, rememberMe }),
            });

            // Parse response body as JSON and log it to the console
            const data = await response.json();
            console.log(data);

            // [ERROR] Error response from backend
            if (response.ok) {
                openModal({
                    type: 'info',
                    title: 'Success',
                    content: 'You have successfully logged in. Redirecting to your dashboard...',
                    size: 'md'
                });
                
                // Save user data to local storage
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("user", JSON.stringify(data.data.user));

                // Navigate to dashboard
                navigate('/dashboard');
            } else {
                alert(data.message || "Login failed")
                return;
            }
        }  catch (err) {
            console.error("Login error:", err);
            alert("An error occured while trying to login.");
        }
    };
    
    return (
        <form className="flex flex-col">
            {/* Header */}
            <div className="mb-8">
                <h2 className={Styles.authHeader}>Login</h2>
                <i className={Styles.authQuote}>"Code less. Create more. — Snippify"</i>
            </div>

            {/* Login Form */}
            <div className="space-y-4 mb-2">
                {/* [INPUT] Username or Email */}
                <div className={Styles.field}>
                    <label className={Styles.inputLabel}>Username or Email</label>
                    <input
                    type="text"
                    name="usernameEmail"
                    placeholder="Username or Email"
                    value={formData.usernameEmail}
                    onChange={handleInputChange}
                    required className={Styles.formInput}/>
                </div>

                {/* [INPUT] Password */}
                <div className={Styles.field}>
                    <label className={Styles.inputLabel}>Password</label>
                    <input
                    type={`${showPassword ? 'password' : 'text'}`}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required className={Styles.formInput}/>

                    {/* [BUTTON] Toggle Password */}
                    <button type="button" onClick={handleTogglePassword} className="cursor-pointer absolute right-3 top-10 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--primary)]">
                        <img src={`${showPassword === true ? 'show-password' : 'hide-password'}-icon.svg`} className={Styles.visibilityIcon}/>
                    </button>
                </div>
            </div>

            {/* Login Options */}
            <div className="flex justify-between items-center mb-4">
                <label className="flex gap-x-2">
                    <input type="checkbox" className="accent-[var(--primary)]"/>
                    <p className="text-[0.825rem]">Remember Me</p>
                </label>
                <button type="button" onClick={handleForgotPassword} className={Styles.textLink}>Forgot password?</button>
            </div>

            {/* [BUTTON] Login */}
            <button onClick={handleLogin} className={Styles.primaryButton}>Login</button>
        </form>
    );
};

export default SignUpForm;