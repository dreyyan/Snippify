// [IMPORT] Components
import Header from "../components/Header/Header";
import MiniHeader from "./Header/MiniHeader";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";

const MainLayout = () => {
    const location = useLocation();
    const miniHeaderPaths = ['/login', '/sign-up'];
    const isMiniHeader = miniHeaderPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {isMiniHeader ? <MiniHeader /> : <Header />}
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      {/* Display footer if non-auth pages */}
      {isMiniHeader ? '' : <Footer/>}
    </div>
  );
};

export default MainLayout;