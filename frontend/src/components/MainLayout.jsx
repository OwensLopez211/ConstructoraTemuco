import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./main/Navbar";
import Footer from "./main/Footer";

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow ${!isHome ? 'container mx-auto px-4 py-8' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;