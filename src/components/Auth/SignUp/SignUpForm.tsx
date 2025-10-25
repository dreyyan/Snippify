import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "../../../styles/Styles";

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
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // [HANDLE] Show/hide password
    const handleTogglePassword = () => { setShowPassword(prev => !prev); };
    const handleToggleConfirmPassword = () => { setShowConfirmPassword(prev => !prev); };

    // [HANDLE] Input field changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // [HANDLE] Process & validate form before registering account
    const handleSignUp = async (e: { preventDefault: () => void; }) => {
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
        <form className="flex flex-col gap-y-4 w-full">
            {/* Header */}
            <div className="flex flex-col justify-center items-center mb-8">
                <h2 className={Styles.authHeader}>Sign Up</h2>
                <i className={Styles.authQuote}>"Become a part of our growing community."</i>
            </div>

            {/* Sign Up Form */}
            <div className="grid grid-cols-2 space-y-2 gap-x-6">
                {/* [INPUT] Full Name */}
                <div className={`${Styles.field} col-span-2`}>
                    <label className={Styles.inputLabel}>Full Name</label>
                    <input
                    type="text"
                    name="name"
                    placeholder="Juan dela Cruz"
                    value={formData.name}
                    onChange={handleInputChange}
                    required className={Styles.formInput}/>
                </div>

                {/* [INPUT] Email */}
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

                {/* [INPUT] Username */}
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

                {/* [INPUT] Password */}
                <div className={Styles.field}>
                    <label className={Styles.inputLabel}>Password</label>
                    <input
                    type={`${showPassword ? 'password' : 'text'}`}
                    name="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleInputChange}
                    required className={Styles.formInput}/>

                    {/* [BUTTON] Toggle Password */}
                    <button type="button" onClick={handleTogglePassword} className="cursor-pointer absolute right-3 top-10 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--primary)]">
                        <img src={`${showPassword === true ? 'show-password' : 'hide-password'}-icon.svg`} className={Styles.visibilityIcon}/>
                    </button>
                </div>

                {/* [INPUT] Confirm Password */}
                <div className={Styles.field}>
                    <label className={Styles.inputLabel}>Confirm Password</label>
                    <input
                    type={`${showConfirmPassword ? 'password' : 'text'}`}
                    name="confirmPassword"
                    placeholder="********"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required className={Styles.formInput}/>

                    {/* [BUTTON] Toggle Password */}
                    <button type="button" onClick={handleToggleConfirmPassword} className="cursor-pointer absolute right-3 top-10 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--primary)]">
                        <img src={`${showConfirmPassword === true ? 'show-password' : 'hide-password'}-icon.svg`} className={Styles.visibilityIcon}/>
                    </button>
                </div>                                                
            </div>

            {/* Sign Up Button */}
            <button onClick={handleSignUp} className={Styles.primaryButton}>Sign Up</button>
        </form>
    );
};

export default SignUpForm;