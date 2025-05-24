import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ClientsBar = () => {
  // Array de clientes con logos y nombres
  const clients = [
    {
      id: 1,
      name: "Banco Estado",
      logo: "https://logos-world.net/wp-content/uploads/2021/02/BancoEstado-Logo.png"
    },
    {
      id: 2,
      name: "Municipalidad de Temuco",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Escudo_de_Temuco.svg/200px-Escudo_de_Temuco.svg.png"
    },
    {
      id: 3,
      name: "Universidad de La Frontera",
      logo: "https://seeklogo.com/images/U/universidad-de-la-frontera-logo-8B5B5B5B5B-seeklogo.com.png"
    },
    {
      id: 4,
      name: "Arauco",
      logo: "https://logos-world.net/wp-content/uploads/2021/11/Arauco-Logo.png"
    },
    {
      id: 5,
      name: "Copec",
      logo: "https://seeklogo.com/images/C/copec-logo-8B5B5B5B5B-seeklogo.com.png"
    },
    {
      id: 6,
      name: "Falabella",
      logo: "https://logos-world.net/wp-content/uploads/2020/12/Falabella-Logo.png"
    },
    {
      id: 7,
      name: "Ripley",
      logo: "https://seeklogo.com/images/R/ripley-logo-8B5B5B5B5B-seeklogo.com.png"
    },
    {
      id: 8,
      name: "Walmart Chile",
      logo: "https://logos-world.net/wp-content/uploads/2020/09/Walmart-Logo.png"
    }
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Empresas que <span className="text-green-600">Confían en Nosotros</span>
          </h2>
          
          <p className="text-gray-600 text-sm max-w-2xl mx-auto">
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
                    {/* Placeholder para logos - puedes reemplazar con imágenes reales */}
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-1 mx-auto group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold text-lg">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-gray-700 truncate">
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