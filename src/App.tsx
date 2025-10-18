import { Routes, Route } from "react-router-dom";

// Page Components
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Home";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      {/* Default Redirect */}
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;