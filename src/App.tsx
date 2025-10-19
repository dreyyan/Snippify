import { Routes, Route } from "react-router-dom";

// Page Components
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import LoginPanel from "./components/Auth/Login/LoginPanel";
import SignUpPanel from "./components/Auth/SignUp/SignUpPanel";

function App() {
  return (
    <Routes>
      {/* Default Redirect */}
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;