import { Routes, Route } from "react-router-dom";

// Page Components
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";

// Context
import { ModalProvider } from "./context/ModalContext";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <ModalProvider>
      <Routes>
        <Route element={<MainLayout/>}>
          {/* Default Redirect */}
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </ModalProvider>
  );
}

export default App;