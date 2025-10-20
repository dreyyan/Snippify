// [IMPORT] Components
import Header from "../components/Header/Header";
import MiniHeader from "./Header/MiniHeader";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
    const location = useLocation();
    const miniHeaderPaths = ["/login", "/sign-up"];
    const isMiniHeader = miniHeaderPaths.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {isMiniHeader ? <MiniHeader /> : <Header />}
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;