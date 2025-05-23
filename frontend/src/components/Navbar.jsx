import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/">
          <img src="/LogoNav.png" alt="Constructora Temuco" className="w-[200px] h-[120px] object-contain" />
        </Link>

        <nav className="flex gap-8 items-center">
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => 
              isActive ? "text-green-700 font-medium" : "text-gray-700 hover:text-green-700 transition-colors"
            }
          >
            Inicio
          </NavLink>
          <NavLink 
            to="/acerca" 
            className={({ isActive }) => 
              isActive ? "text-green-700 font-medium" : "text-gray-700 hover:text-green-700 transition-colors"
            }
          >
            Acerca de
          </NavLink>
          <NavLink 
            to="/servicios" 
            className={({ isActive }) => 
              isActive ? "text-green-700 font-medium" : "text-gray-700 hover:text-green-700 transition-colors"
            }
          >
            Servicios
          </NavLink>
          <NavLink 
            to="/proyectos" 
            className={({ isActive }) => 
              isActive ? "text-green-700 font-medium" : "text-gray-700 hover:text-green-700 transition-colors"
            }
          >
            Proyectos
          </NavLink>
          <NavLink 
            to="/contacto" 
            className={({ isActive }) => 
              isActive ? "text-green-700 font-medium" : "text-gray-700 hover:text-green-700 transition-colors"
            }
          >
            Contacto
          </NavLink>
        </nav>

        <Link to="/contacto">
          <button className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition-colors font-medium">
            Contáctanos Hoy
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
