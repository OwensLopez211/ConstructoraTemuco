import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Phone, Mail, Menu, X, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("inicio");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigationItems = [
    { id: "inicio", label: "Inicio", path: "/" },
    { id: "servicios", label: "Servicios", href: "#servicios" },
    { id: "proyectos", label: "Proyectos", path: "/proyectos" },
    { id: "nosotros", label: "Nosotros", path: "/nosotros" },
    { id: "contacto", label: "Contacto", path: "/contacto" }
  ];

  // Función para manejar la navegación
  const handleNavigation = (item) => {
    closeMenu();
    if (item.href && item.href.startsWith('#')) {
      // Es un enlace de ancla
      const targetId = item.href.substring(1);
      const element = document.getElementById(targetId);
      
      if (location.pathname === '/') {
        // Si ya estamos en la página de inicio, hacer scroll directo
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Si no estamos en la página de inicio, navegar a / y pasar el hash
        navigate('/', { state: { scrollToId: targetId } });
      }
    } else if (item.path) {
      // Es una ruta de React Router
      navigate(item.path);
    }
  };

  // Determinar cuál pestaña está activa basándose en la ruta actual o el hash
  const getActiveTab = () => {
    const currentPath = location.pathname;
    const currentHash = location.hash;

    // Verificar si estamos en páginas de servicios
    if (currentPath.startsWith('/servicios/')) {
      return "servicios";
    }

    // Verificar si estamos en la sección servicios (#servicios) o si detectamos que estamos en esa sección
    if (currentHash === '#servicios') {
      return "servicios";
    }

    // Detectar si estamos en la sección servicios por scroll en la página principal
    if (currentPath === '/' && !currentHash) {
      const serviciosElement = document.getElementById('servicios');
      if (serviciosElement) {
        const rect = serviciosElement.getBoundingClientRect();
        const isInView = rect.top <= 100 && rect.bottom >= 100; // Consideramos activo si está cerca del top
        if (isInView) {
          return "servicios";
        }
      }
    }

    // Priorizar el hash si existe y coincide con un href de ancla
    if (currentHash) {
      const activeItem = navigationItems.find(item => item.href === currentHash);
      if (activeItem) return activeItem.id;
    }

    // Si no hay hash o no coincide, usar la ruta
    const activeItem = navigationItems.find(item => item.path === currentPath);
    return activeItem ? activeItem.id : "inicio";
  };

  // Initialize activeTab state using getActiveTab
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location]);

  // Detectar cuando estamos en la sección servicios por scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Solo actualizar activeTab si estamos en la página principal sin hash
      if (location.pathname === '/' && !location.hash) {
        setActiveTab(getActiveTab());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <>
      {/* Top bar con información de contacto */}
      <div 
        className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 hidden lg:block"
      >
        <div className="container mx-auto px-4 flex justify-start items-center">
          {/* Izquierda: Teléfono y correo */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 group">
              <Phone className="w-4 h-4 text-green-200 group-hover:text-white transition-colors" />
              <span className="text-sm font-sans font-medium">+56 45 2 810749</span>
            </div>
            <div className="flex items-center space-x-2 group">
              <Mail className="w-4 h-4 text-green-200 group-hover:text-white transition-colors" />
              <span className="text-sm font-sans font-medium">contacto@ctemuco.cl</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar principal */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
            : 'bg-white/90 backdrop-blur-sm shadow-md'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Espacio izquierdo para balancear (desktop) */}
            <div className="hidden lg:flex lg:w-48"></div>

            {/* Desktop Navigation - Centrado */}
            <nav className="hidden lg:flex items-center justify-center space-x-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`relative px-4 py-2 text-sm font-display font-medium rounded-lg transition-all duration-300 group ${
                    activeTab === item.id
                      ? "text-green-600 bg-green-50" 
                      : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-green-600 to-blue-600 transition-all duration-300 ${
                    activeTab === item.id ? "w-8" : "group-hover:w-8"
                  }`} />
                </button>
              ))}
            </nav>

            {/* Desktop Zoho Access - Derecha */}
            <div className="hidden lg:flex lg:w-48 justify-end">
              <a
                href="https://accounts.zoho.com/signin?service_language=es&servicename=VirtualOffice&signupurl=https://www.zoho.com/es-xl/workplace/pricing.html&serviceurl=https://workplace.zoho.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 group shadow-md"
              >
                <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-display font-medium">Acceso Empleados</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden ml-auto p-2 rounded-xl text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-all duration-200"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </button>
          </div>

          {/* Mobile Navigation */}
          <motion.div 
            className="lg:hidden overflow-hidden"
            initial={false}
            animate={{
              height: isMenuOpen ? "auto" : 0,
              opacity: isMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <nav className="flex flex-col space-y-1 py-4 border-t border-gray-100 mt-4">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => handleNavigation(item)}
                    className={`w-full text-left py-3 px-4 rounded-xl text-sm font-display font-medium transition-all duration-200 ${
                      activeTab === item.id
                        ? "text-green-600 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-600" 
                        : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}

              {/* Mobile Zoho Access */}
              <motion.div 
                className="pt-3"
                initial={{ x: -20, opacity: 0 }}
                animate={isMenuOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: navigationItems.length * 0.1 }}
              >
                <a
                  href="https://accounts.zoho.com/signin?service_language=es&servicename=VirtualOffice&signupurl=https://www.zoho.com/es-xl/workplace/pricing.html&serviceurl=https://workplace.zoho.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl text-sm font-display font-semibold shadow-lg transition-all duration-300 group"
                >
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-center">Acceso Empleados - Zoho</span>
                </a>
              </motion.div>

              {/* Mobile CTA Button */}
              <motion.div 
                className="pt-4 border-t border-gray-100"
                initial={{ y: 20, opacity: 0 }}
                animate={isMenuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: (navigationItems.length + 1) * 0.1 }}
              >
                <button 
                  onClick={() => handleNavigation({ path: '/contacto' })}
                  className="w-full bg-white border-2 border-green-600 text-green-600 py-3 rounded-xl text-sm font-display font-semibold hover:bg-green-50 transition-all duration-300"
                >
                  Contáctanos Hoy
                </button>
              </motion.div>

              {/* Mobile Contact Info */}
              <motion.div 
                className="pt-4 border-t border-gray-100 space-y-3"
                initial={{ y: 20, opacity: 0 }}
                animate={isMenuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: (navigationItems.length + 2) * 0.1 }}
              >
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-sans font-medium">+56 45 2 810749</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-sans font-medium">contacto@ctemuco.cl</span>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        </div>
      </header>
    </>
  );
};

export default Navbar;