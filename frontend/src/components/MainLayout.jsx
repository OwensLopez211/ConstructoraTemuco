import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./main/Navbar";
import Footer from "./main/Footer";
import ScrollToTop from "./animations/ScrollToTop";

const MainLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">

          
            <div className={!isHome }>
              <Outlet />
            </div>

      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;