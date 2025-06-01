import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPage from '../components/main/HeaderPage';
import PageTransition from '../components/animations/PageTransition';
import { Building, Hammer, Wrench, FileText } from 'lucide-react';

const ServicesPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      title: "Proyectos Privados",
      description: "Desarrollamos proyectos residenciales y comerciales con los más altos estándares de calidad.",
      icon: Building,
      path: "/servicios/proyectos-privados",
      image: "/Private-Obra.jpg"
    },
    {
      title: "Obras Civiles",
      description: "Construcción de infraestructura vital para el desarrollo de comunidades.",
      icon: Hammer,
      path: "/servicios/obras-civiles",
      image: "/Infraestructura.jpg"
    },
    {
      title: "Proyectos Públicos",
      description: "Participamos en licitaciones públicas con registro MINVU y MOP vigentes.",
      icon: FileText,
      path: "/servicios/proyectos-publicos",
      image: "/Public-Obra.jpg"
    },
    {
      title: "Servicios Profesionales",
      description: "Mantención y reparación especializada para preservar tus espacios construidos.",
      icon: Wrench,
      path: "/servicios/servicios-profesionales",
      image: "/Infraestructura.jpg"
    }
  ];

  return (
    <PageTransition variant="slide">
      <div>
        {/* Header */}
        <HeaderPage
          title="Nuestros Servicios"
          backgroundImage="/Infraestructura.jpg"
          height="h-[400px]"
          overlay="bg-black/40"
          subtitle="Soluciones integrales en construcción y desarrollo"
          titleSize="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
        />

        {/* Servicios Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {/* Imagen de fondo */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                      style={{ backgroundImage: `url(${service.image})` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40" />
                    </div>

                    {/* Contenido */}
                    <div className="relative p-8 h-full flex flex-col justify-between">
                      <div>
                        <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-display font-bold text-white mb-3">
                          {service.title}
                        </h3>
                        <p className="text-gray-200 font-sans">
                          {service.description}
                        </p>
                      </div>
                      
                      <button
                        onClick={() => navigate(service.path)}
                        className="mt-6 inline-flex items-center text-white hover:text-green-400 transition-colors duration-300 group"
                      >
                        <span className="font-display font-medium">Conocer más</span>
                        <svg
                          className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default ServicesPage; 