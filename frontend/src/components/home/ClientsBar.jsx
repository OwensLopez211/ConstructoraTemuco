import React from 'react';
import { motion } from "framer-motion";

const ClientsBar = () => {
  // Array de clientes con logos reales
  const clients = [
    {
      id: 1,
      name: "CCHC",
      logo: "/logoswebp/Logo-CCHC.webp"
    },
    {
      id: 2,
      name: "Constructora del Bosque",
      logo: "/logoswebp/Logo-Constructora-del-Bosque.webp"
    },
    {
      id: 3,
      name: "Costa Araucanía",
      logo: "/logoswebp/Logo-Costa-Araucania.webp"
    },
    {
      id: 4,
      name: "Dubois",
      logo: "/logoswebp/Logo-Dubois.webp"
    },
    {
      id: 5,
      name: "Municipalidad de Curarrehue",
      logo: "/logoswebp/Logo-Municipalidad-Curarrehue.webp"
    },
    {
      id: 6,
      name: "Municipalidad de Villarrica",
      logo: "/logoswebp/Logo-Municipalidad-Villarrica.webp"
    },
    {
      id: 7,
      name: "Servicio de Salud",
      logo: "/logoswebp/Logo-Servicio-Salud.webp"
    },
    {
      id: 8,
      name: "Plaengue",
      logo: "/logoswebp/Logo-Plaenge.webp"
    },
  ];

  // Duplicamos el array para crear el efecto de scroll infinito
  const duplicatedClients = [...clients, ...clients];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative py-12 bg-gradient-to-br from-slate-50 to-gray-100 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, #059669 0%, transparent 50%)
          `,
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-2">
            Empresas que <span className="text-green-600">Confían en Nosotros</span>
          </h2>
          
          <p className="text-gray-600 text-sm max-w-2xl mx-auto font-sans">
            Hemos tenido el honor de trabajar con organizaciones líderes en Chile, 
            construyendo relaciones duraderas basadas en la calidad y confianza.
          </p>
        </div>

        {/* Clients Carousel */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-100 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-100 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling Container */}
          <div className="overflow-hidden">
            <div 
              className="flex space-x-8 animate-scroll"
              style={{
                width: `${clients.length * 200}px`,
                animation: 'scroll 30s linear infinite'
              }}
            >
              {duplicatedClients.map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="flex-shrink-0 w-40 h-20 bg-white rounded-xl shadow-sm border border-gray-200 flex items-center justify-center p-4 hover:shadow-md hover:scale-105 transition-all duration-300 group"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={client.logo}
                      alt={`Logo de ${client.name}`}
                      className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      loading="lazy"
                      onError={(e) => {
                        // Fallback en caso de que la imagen no cargue
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    {/* Fallback text - solo se muestra si la imagen falla */}
                    <div className="hidden text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-1 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-lg">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-xs font-sans font-medium text-gray-700 truncate">
                        {client.name.length > 12 ? client.name.substring(0, 12) + '...' : client.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${clients.length * 200}px);
          }
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        @media (max-width: 768px) {
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-${clients.length * 160}px);
            }
          }
        }
      `}</style>
    </motion.section>
  );
};

export default ClientsBar;