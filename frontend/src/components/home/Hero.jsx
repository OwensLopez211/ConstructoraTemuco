import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import StatsSection from './StatsSection';

const Hero = () => {
  const images = [
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2131&q=80',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia la imagen cada 5 segundos (ajusta este valor si quieres otra velocidad)

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative w-full overflow-hidden bg-gray-50">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: `url(${images[currentImageIndex]})`,
          transition: 'background-image 1s ease-in-out', // Transición suave entre imágenes
        }}
        aria-hidden="true"
      />
      
      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col items-start text-left">
        
        {/* Top Text */}
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-lg md:text-xl lg:text-2xl font-display font-semibold text-gray-800 mb-8 max-w-2xl"
        >
          Construimos para darle valor a tus proyectos
        </motion.p>
        
        {/* Logo Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <img 
            src="/Logo-grande.png" 
            alt="Constructora Temuco Logo" 
            className="h-40 md:h-48 lg:h-80 w-auto object-contain drop-shadow-lg"
            onError={(e) => {
              // Fallback si no se encuentra la imagen
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'block';
            }}
          />
          
          {/* Fallback Logo Text (se muestra si falla la imagen) */}
          <div className="hidden flex-col items-start">
            <div className="flex flex-col items-center mb-4">
              {/* Casa/Edificio Icon */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-green-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-black text-gray-900 tracking-wide">CONSTRUCTORA</h2>
              <h1 className="text-4xl md:text-5xl font-display font-black text-gray-900 mt-1">TEMUCO</h1>
              <div className="w-32 h-2 bg-green-600 mt-3 rounded-full"></div>
            </div>
          </div>
        </motion.div>
        
        {/* CTA Button - Nuevo diseño moderno */}
        <motion.a 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ y: -2, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#contact"
          className="bg-transparent border-2 border-green-600 hover:bg-green-600 hover:border-green-600 text-green-600 hover:text-white text-base md:text-lg font-display font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 tracking-wide focus:ring-4 focus:ring-green-200 focus:outline-none"
        >
          CONTÁCTANOS
        </motion.a>
        
      </div>
      
      {/* Bottom Stats Section */}
      <StatsSection />
    </section>
  );
};

export default Hero;