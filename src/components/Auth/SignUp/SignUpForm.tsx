import { useState } from "react";
import Styles from "../../../styles/Styles";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "Adrian Dominic Tan",
        email: "adriandominic.tan@wvsu.edu.ph",
        username: "dreyyan",
        password: "dreyyan123",
        confirmPassword: "dreyyan123",
        // name: "",
        // email: "",
        // username: "",
        // password: "",
        // confirmPassword: ""
    });

    // [HANDLE] Input field changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // [HANDLE] Process & validate form before registering account
    const handleSignUp = async (e) => {
        e.preventDefault(); // Prevent page reload

        const { name, email, username, password, confirmPassword } = formData;

        // [VALIDATION] Missing input fields
        if (!name || !email || !username || !password || !confirmPassword) {
            alert("Please fill out all fields.");
            return;
        }

        // [VALIDATION] Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // [VALIDATION] Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // If information checks out, send data to backend
        const userData = { name, email, username, password };

        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            // Display user data to console
            const data = await response.json();
            console.log(data);

            // ERROR: Error response from backend
            if (!response.ok)
                return;

            // Navigate to login
            navigate('/login');
        } catch (err) {
            console.error("Signup error:", err);
            alert("Failed to connect to the server.");
        }
    };

    return (
        <form className="flex flex-col">
            <text className="text-3xl font-bold mb-4">Sign Up</text>
            <div className="space-y-2 mb-6">
                <div className={Styles.field}>
                    <label className={Styles.inputLabel}>Full Name</label>
                    <input
                    type="text"
                    name="name"
                    placeholder="Juan dela Cruz"
                    value={formData.name}
                    onChange={handleInputChange}
                    required className={Styles.formInput}/>
                </div>

                <div className={Styles.field}>
                    <label className={Styles.inputLabel}>Email</label>
                    <input
                    type="email"
                    name="email"
                    placeholder="example@domain.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required className={Styles.formInput}/>
                </div>
                <div className={Styles.field}>
                    <label className={Styles.inputLabel}>Username</label>
                    <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required className={Styles.formInput}/>
                </div>
                <div className={Styles.field}>
                    <label className={Styles.inputLabel}>Password</label>
                    <input
                    type="password"
                    name="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleInputChange}
                    required className={Styles.formInput}/>
                </div>
                <div className={Styles.field}>
                    <label className={Styles.inputLabel}>Confirm Password</label>
                    <input
                    type="password"
                    name="confirmPassword"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required className={Styles.formInput}/>
                </div>                                                
            </div>
            {/* Sign Up Button */}
            <button onClick={handleSignUp} className={Styles.primaryButton}>Sign Up</button>
        </form>
    );
};

export default SignUpForm;