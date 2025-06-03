import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter,
  Building,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigation = (path) => {
    navigate(path);
    scrollToTop(); // Opcional: hacer scroll al top cuando navegues
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 group"
      >
        <ArrowUp className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-center sm:justify-start mb-6">
                <img 
                  src="/LogoNav.png" 
                  alt="Constructora Temuco Logo" 
                  className="w-24 sm:w-28 md:w-32 h-auto rounded-lg"
                />
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base max-w-md font-sans text-center sm:text-left text-justify">
                Más de 8 años construyendo sueños en Temuco y la Región de la Araucanía.
                Especialistas en construcciones privadas y publicas con los más altos estándares de calidad y compromiso.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4 justify-center sm:justify-start">
                <a href="https://www.facebook.com/profile.php?id=100054373234943" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors duration-300 group">
                  <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
                <a href="https://www.instagram.com/constructoratemuco/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors duration-300 group">
                  <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-display font-semibold mb-4 sm:mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <button 
                    onClick={() => handleNavigation('/')}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base font-sans text-left"
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/nosotros')}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base font-sans text-left"
                  >
                    Sobre Nosotros
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/servicios')}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base font-sans text-left"
                  >
                    Servicios
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/proyectos')}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base font-sans text-left"
                  >
                    Proyectos
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('/contacto')}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base font-sans text-left"
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-display font-semibold mb-4 sm:mb-6">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm sm:text-base font-sans">
                      Volcán Calbuco 345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <a href="tel:+56 45 2 810749" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base font-sans">
                    +56 45 2 810749
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <a href="mailto:contacto@ctemuco.cl" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base font-sans">
                    contacto@ctemuco.cl
                  </a>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm sm:text-base font-sans">
                      Lun - Vie: 8:00 - 18:00<br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-gray-400 text-sm text-center sm:text-left font-sans">
              © {new Date().getFullYear()} Constructora Temuco. Todos los derechos reservados.
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-end space-x-6 text-sm">
              <button 
                onClick={() => handleNavigation('/privacidad')}
                className="text-gray-400 hover:text-green-400 transition-colors duration-200 font-sans"
              >
                Política de Privacidad
              </button>
              <button 
                onClick={() => handleNavigation('/terminos')}
                className="text-gray-400 hover:text-green-400 transition-colors duration-200 font-sans"
              >
                Términos de Servicio
              </button>
              <button 
                onClick={() => handleNavigation('/mapa-sitio')}
                className="text-gray-400 hover:text-green-400 transition-colors duration-200 font-sans"
              >
                Mapa del Sitio
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;