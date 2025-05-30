import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Phone, Mail, Clock, Menu, X } from "lucide-react";
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

  // Detectar scroll para cambiar el estilo del navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  }, [location]); // Depende de location and getActiveTab (though getActiveTab dependencies are handled by location and navigationItems)

  return (
    <>
      {/* Top bar con información de contacto */}
      <motion.div 
        className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 hidden lg:block"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Izquierda: Teléfono y correo */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 group">
              <Phone className="w-4 h-4 text-green-200 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium">+56 45 2 810749</span>
            </div>
            <div className="flex items-center space-x-2 group">
              <Mail className="w-4 h-4 text-green-200 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium">contacto@ctemuco.cl</span>
            </div>
          </div>
          
          {/* Derecha: Horario y CTA */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-green-200" />
              <span className="text-sm font-medium">Lun - Vie 8:00 AM - 6:00 PM</span>
            </div>
            <motion.button
              onClick={() => handleNavigation('/contacto')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-semibold border border-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cotización Gratis
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Navbar principal */}
      <motion.header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100' 
            : 'bg-white/90 backdrop-blur-sm shadow-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center space-x-4 flex-grow">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
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

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:text-green-600 hover:bg-gray-100 transition-all duration-200"
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
                    className={`w-full text-left py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeTab === item.id
                        ? "text-green-600 bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-600" 
                        : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </button>
                </motion.div>
              ))}

              {/* Mobile CTA Button */}
              <motion.div 
                className="pt-4 border-t border-gray-100"
                initial={{ y: 20, opacity: 0 }}
                animate={isMenuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button 
                  onClick={() => handleNavigation('/contacto')}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 rounded-xl text-sm font-semibold shadow-lg transition-all duration-300"
                >
                  Contáctanos Hoy
                </button>
              </motion.div>

              {/* Mobile Contact Info */}
              <motion.div 
                className="pt-4 border-t border-gray-100 space-y-3"
                initial={{ y: 20, opacity: 0 }}
                animate={isMenuOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium">+56 45 2 810749</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium">contacto@ctemuco.cl</span>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        </div>
      </motion.header>
    </>
  );
};

export default Navbar;