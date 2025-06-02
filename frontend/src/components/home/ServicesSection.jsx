import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../animations/PageTransition';

const ServicesSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    setIsTransitioning(true);
    setTimeout(() => {
      navigate(path);
    }, 400); // Duración de la transición
  };

  const services = [
    {
      id: 1,
      title: "Proyectos Privados",
      subtitle: "Modificación y Ampliación",
      description: "Transformamos y expandimos tu hogar con diseños personalizados que se adaptan a tus necesidades y estilo de vida.",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      features: ["Diseño personalizado", "Ampliaciones", "Renovaciones", "Asesoría completa"]
    },
    {
      id: 2,
      title: "Proyectos Públicos",
      subtitle: "Obras de Gran Escala",
      description: "Desarrollamos infraestructura pública con los más altos estándares de calidad y cumplimiento normativo.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      features: ["Infraestructura", "Cumplimiento normativo", "Gran escala", "Impacto social"]
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="servicios" className="py-12 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div 
          className="text-center mb-16 lg:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent text-sm font-display font-semibold tracking-wider uppercase">
              Nuestros Servicios
            </span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight">
            Diseñamos, construimos y
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              equipamos tus espacios
            </span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-2 font-sans">
            Ofrecemos soluciones integrales de construcción con la más alta calidad, 
            desde proyectos residenciales hasta obras de gran envergadura.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="group relative"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-56 lg:h-72 overflow-hidden rounded-t-3xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                  
                  <img 
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 rounded-t-3xl"
                  />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                      <div className="text-green-600">
                        {service.icon}
                      </div>
                    </div>
                  </div>

                  {/* Floating Number */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-sm">{service.id}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8">
                  <div className="mb-4">
                    <h3 className="text-xl lg:text-2xl font-display font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-green-600 font-display font-semibold text-sm lg:text-base">
                      {service.subtitle}
                    </p>
                  </div>

                  <p className="text-gray-600 mb-6 leading-relaxed font-sans">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center text-sm text-gray-500 font-sans"
                        initial={{ opacity: 0, x: -20 }}
                        animate={hoveredCard === service.id ? { opacity: 1, x: 0 } : { opacity: 0.7, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    onClick={() => {
                      let path = '';
                      switch (service.id) {
                        case 1:
                          path = '/servicios/proyectos-privados';
                          break;
                        case 2:
                          path = '/servicios/proyectos-publicos';
                          break;
                        default:
                          path = '/servicios';
                      }
                      if (path) {
                        handleNavigation(path);
                      }
                    }}
                    className="group/btn w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-display font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-center">
                      Conocer más
                      <svg 
                        className="w-4 h-4 ml-2 transform group-hover/btn:translate-x-1 transition-transform duration-200" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.button>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-blue-500/5 rounded-3xl" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;