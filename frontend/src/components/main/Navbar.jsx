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
      <div className="bg-primary text-white py-2 hidden lg:block">
        <div className="container mx-auto px-6 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+56 9 8765 4321</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@constructoratemuco.cl</span>
            </div>
          </div>
          <div className="text-sm">
            Horario: Lun - Vie 8:00 AM - 6:00 PM
          </div>
        </div>
      </div>

      {/* Navbar principal */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img 
                src="/LogoNav.png" 
                alt="Constructora Temuco" 
                className="w-[120px] h-[60px] sm:w-[150px] sm:h-[80px] md:w-[180px] md:h-[100px] object-contain hover:scale-105 transition-transform duration-300" 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <NavLink 
                to="/" 
                end 
                className={({ isActive }) => 
                  `relative py-2 px-1 text-lg font-medium transition-all duration-300 ${
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
                to="/acerca" 
                className={({ isActive }) => 
                  `relative py-2 px-1 text-lg font-medium transition-all duration-300 ${
                    isActive 
                      ? "text-primary" 
                      : "text-gray-700 hover:text-primary"
                  } after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-primary after:left-0 after:bottom-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                    isActive ? "after:scale-x-100" : ""
                  }`
                }
              >
                Acerca de
              </NavLink>
              
              <NavLink 
                to="/servicios" 
                className={({ isActive }) => 
                  `relative py-2 px-1 text-lg font-medium transition-all duration-300 ${
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
                  `relative py-2 px-1 text-lg font-medium transition-all duration-300 ${
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
                to="/contacto" 
                className={({ isActive }) => 
                  `relative py-2 px-1 text-lg font-medium transition-all duration-300 ${
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
                <button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Contáctanos Hoy
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? "max-h-96 opacity-100 mt-4" 
              : "max-h-0 opacity-0 overflow-hidden"
          }`}>
            <nav className="flex flex-col space-y-4 py-4 border-t border-gray-200">
              <NavLink 
                to="/" 
                end 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`
                }
              >
                Inicio
              </NavLink>
              
              <NavLink 
                to="/acerca" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`
                }
              >
                Acerca de
              </NavLink>
              
              <NavLink 
                to="/servicios" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200 ${
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
                  `py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`
                }
              >
                Proyectos
              </NavLink>
              
              <NavLink 
                to="/contacto" 
                onClick={closeMenu}
                className={({ isActive }) => 
                  `py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200 ${
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`
                }
              >
                Contacto
              </NavLink>

              {/* Mobile CTA Button */}
              <div className="pt-4 border-t border-gray-200">
                <Link to="/contacto" onClick={closeMenu}>
                  <button className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Contáctanos Hoy
                  </button>
                </Link>
              </div>

              {/* Mobile Contact Info */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-sm">+56 9 8765 4321</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm">info@constructoratemuco.cl</span>
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