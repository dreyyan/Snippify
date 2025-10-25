import { Routes, Route } from "react-router-dom";

// Page Components
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";

// Context
import { ModalProvider } from "./context/ModalContext";
import { FileWindowProvider } from "./context/FileWindowContext";
import MainLayout from "./components/MainLayout";
import MySnippets from "./pages/MySnippets";
import MyLinks from "./pages/MyLinks";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import HelpSupport from "./pages/HelpSupport";
import MyProfile from "./pages/MyProfile";
import Settings from "./pages/Settings";

function App() {
  return (
    <ModalProvider>
      <FileWindowProvider>
        <Routes>
          <Route element={<MainLayout/>}>
            {/* Default Redirect */}
            <Route path="/" element={<Home/>}/>
            {/* Routes: Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />

            {/* Routes: Features */}
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/my-snippets" element={<MySnippets/>}/>
            <Route path="/my-links" element={<MyLinks/>}/>

            {/* Routes: Profile */}
            <Route path="/my-profile" element={<MyProfile/>}/>
            <Route path="/settings" element={<Settings/>}/>

            {/* Routes: Footer */}
            <Route path="/about" element={<About/>}/>
            <Route path="/privacy-and-policy" element={<PrivacyPolicy/>}/>
            <Route path="/terms-of-service" element={<TermsOfService/>}/>
            <Route path="/help-and-support" element={<HelpSupport/>}/>
          </Route>
        </Routes>
      </FileWindowProvider>
    </ModalProvider>
  );
}

export default App;