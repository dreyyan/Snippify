import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Styles from "../../../styles/Styles";

const SignUpForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        usernameEmail: "",
        password: ""
    });

    // [HANDLE] Input field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // [HANDLE] Process & validate form before registering account
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload

        const { usernameEmail, password } = formData;

        // [VALIDATION] Missing input fields
        if (!usernameEmail || !password) {
            alert("Please fill in both fields.");
            return;
        }

        // Call backend login API
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ usernameEmail, password }),
            });

            // Display user data to console
            const data = await response.json();
            console.log(data);

            // ERROR: Error response from backend
            if (response.ok) {
                alert("Login successful!");
                // Navigate to Dashboard
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
            <text className="text-3xl font-bold mb-4">Login</text>
            <div className="space-y-4 mb-3">
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
                <div className={Styles.field}>
                    <label className={Styles.inputLabel}>Password</label>
                    <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required className={Styles.formInput}/>
                </div>
            </div>
            {/* Other Options */}
            <div className="flex justify-between mb-4">
                <span className="flex gap-x-2">
                    <input type="checkbox" className="accent-[var(--primary)]"/><p className="text-[12px]">Remember Me</p>
                </span>
                <Link to="/forgot-password" className={Styles.textLink}>Forgot password?</Link>
            </div>
            {/* Login Button */}
            <button onClick={handleLogin} className={Styles.primaryButton}>Login</button>
        </form>
    );
};

export default SignUpForm;