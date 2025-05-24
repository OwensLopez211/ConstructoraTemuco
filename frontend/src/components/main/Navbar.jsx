import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top bar con información de contacto */}
      <div className="bg-primary text-white py-2 hidden lg:block border-b border-white/10">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs">
          {/* Izquierda: Teléfono y correo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-green-200" />
              <span className="text-xs text-white">+56 9 8765 4321</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-green-200" />
              <span className="text-xs text-white">info@constructoratemuco.cl</span>
            </div>
          </div>
          {/* Derecha: Horario */}
          <div className="flex items-center space-x-1.5">
            <span className="inline-block w-3.5 h-3.5 text-green-200">
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' className="w-3.5 h-3.5"><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16.72 11.06c-.36-.13-.76-.03-1.03.25l-2.2 2.2a11.05 11.05 0 01-4.24-4.24l2.2-2.2a.997.997 0 00.25-1.03A9.05 9.05 0 003.05 6.05c-.55.1-.97.57-.97 1.13 0 8.28 6.72 15 15 15 .56 0 1.03-.42 1.13-.97a9.05 9.05 0 00-2.49-7.15z' /></svg>
            </span>
            <span className="text-xs text-white">Horario: Lun - Vie 8:00 AM - 6:00 PM</span>
          </div>
        </div>
      </div>

      {/* Navbar principal */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src="/LogoNav.png" 
                alt="Constructora Temuco" 
                className="w-[80px] h-[40px] sm:w-[100px] sm:h-[50px] md:w-[120px] md:h-[60px] object-contain hover:scale-105 transition-transform duration-300" 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => 
                  `relative py-1.5 px-1 text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-primary" 
                      : "text-gray-700 hover:text-primary"
                  } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                    isActive ? "after:scale-x-100" : ""
                  }`
                }
              >
                Inicio
              </NavLink>
              
              <NavLink 
                to="/servicios" 
                className={({ isActive }) => 
                  `relative py-1.5 px-1 text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-primary" 
                      : "text-gray-700 hover:text-primary"
                  } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                    isActive ? "after:scale-x-100" : ""
                  }`
                }
              >
                Servicios
              </NavLink>
              
              <NavLink 
                to="/proyectos" 
                className={({ isActive }) => 
                  `relative py-1.5 px-1 text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-primary" 
                      : "text-gray-700 hover:text-primary"
                  } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                    isActive ? "after:scale-x-100" : ""
                  }`
                }
              >
                Proyectos
              </NavLink>
              
              <NavLink 
                to="/acerca" 
                className={({ isActive }) => 
                  `relative py-1.5 px-1 text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-primary" 
                      : "text-gray-700 hover:text-primary"
                  } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                    isActive ? "after:scale-x-100" : ""
                  }`
                }
              >
                Nosotros
              </NavLink>
              
              <NavLink 
                to="/contacto" 
                className={({ isActive }) => 
                  `relative py-1.5 px-1 text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-primary" 
                      : "text-gray-700 hover:text-primary"
                  } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                    isActive ? "after:scale-x-100" : ""
                  }`
                }
              >
                Contacto
              </NavLink>
            </nav>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Link to="/contacto">
                <button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-5 py-2 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                  Contáctanos Hoy
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-1.5 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? "max-h-80 opacity-100 mt-3" 
              : "max-h-0 opacity-0 overflow-hidden"
          }`}>
            <nav className="flex flex-col space-y-2 py-3 border-t border-gray-200">
              <NavLink 
                to="/" 
                end 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`
                }
              >
                Inicio
              </NavLink>
              
              <NavLink 
                to="/servicios" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`
                }
              >
                Servicios
              </NavLink>
              
              <NavLink 
                to="/proyectos" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`
                }
              >
                Proyectos
              </NavLink>
              
              <NavLink 
                to="/acerca" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`
                }
              >
                Nosotros
              </NavLink>
              
              <NavLink 
                to="/contacto" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`
                }
              >
                Contacto
              </NavLink>

              {/* Mobile CTA Button */}
              <div className="pt-3 border-t border-gray-200">
                <Link to="/contacto" onClick={closeMenu}>
                  <button className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-2.5 rounded-md text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                    Contáctanos Hoy
                  </button>
                </Link>
              </div>

              {/* Mobile Contact Info */}
              <div className="pt-3 border-t border-gray-200 space-y-2">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs">+56 9 8765 4321</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs">info@constructoratemuco.cl</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;