import React from 'react';
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
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
              <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                <img src="/LogoNav.png" alt="Constructora Temuco Logo" className="w-12" />
                <h3 className="text-xl sm:text-2xl font-bold">Constructora Temuco</h3>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6 text-sm sm:text-base max-w-md">
                Más de 15 años construyendo sueños en Temuco y la Región de La Araucanía. 
                Especialistas en construcción residencial y comercial con los más altos 
                estándares de calidad y compromiso.
              </p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=100054373234943" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors duration-300 group">
                  <Facebook className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
                <a href="https://www.instagram.com/constructoratemuco/" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-lg flex items-center justify-center transition-colors duration-300 group">
                  <Instagram className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 sm:mb-6">Enlaces Rápidos</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base">
                    Inicio
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base">
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base">
                    Servicios
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base">
                    Proyectos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base">
                    Cotización
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 sm:mb-6">Contacto</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm sm:text-base">
                      Volcán Calbuco 345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <a href="tel:+56 45 2 810749" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base">
                    +56 45 2 810749
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <a href="mailto:contacto@ctemuco.cl" className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm sm:text-base">
                    contacto@ctemuco.cl
                  </a>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm sm:text-base">
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
            <div className="text-gray-400 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Constructora Temuco. Todos los derechos reservados.
            </div>
            
            <div className="flex flex-wrap justify-center sm:justify-end space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                Términos de Servicio
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                Mapa del Sitio
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;