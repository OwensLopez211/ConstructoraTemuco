import React from 'react';
import { ArrowRight, Building, Users, Wrench, PaintBucket, Settings } from 'lucide-react';

const Services = () => {
  const services = [
    {
      id: '01',
      title: 'Construcción De Infraestructura',
      description: 'Desarrollo completo de proyectos de infraestructura con los más altos estándares de calidad.',
      icon: Building
    },
    {
      id: '02',
      title: 'Consultoría De Proyectos',
      description: 'Asesoramiento profesional en todas las etapas de planificación y desarrollo de proyectos.',
      icon: Users
    },
    {
      id: '03',
      title: 'Mantenimiento De Edificios',
      description: 'Servicios integrales de mantenimiento preventivo y correctivo para edificaciones.',
      icon: Wrench
    },
    {
      id: '04',
      title: 'Renovación Y Remodelación',
      description: 'Transformamos espacios existentes con diseños modernos y funcionales.',
      icon: PaintBucket
    },
    {
      id: '05',
      title: 'Gestión De Proyectos',
      description: 'Administración completa de proyectos desde la concepción hasta la entrega final.',
      icon: Settings
    }
  ];

  return (
    <section className="bg-gray-50 py-8 px-3 sm:py-12 md:py-16 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <div className="inline-block mb-2 sm:mb-3">
            <span className="bg-green-50 text-green-700 font-medium text-xs px-3 py-1.5 rounded-full">
              NUESTROS SERVICIOS
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
            Servicios Integrales De 
            <span className="block text-green-700">Construcción En Temuco</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-100 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-lg flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" />
                  </div>
                  <span className="text-green-700 font-bold text-sm sm:text-base">{service.id}.</span>
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-700 transition-colors duration-300 leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-3 sm:mb-4 text-xs sm:text-sm">
                  {service.description}
                </p>
                
                <div className="flex items-center text-green-700 font-medium group-hover:translate-x-2 transition-transform duration-300 text-xs sm:text-sm">
                  <span className="mr-2">Leer Más</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}

          {/* CTA Card */}
          <div className="bg-gray-900 rounded-lg sm:rounded-xl p-4 sm:p-6 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-700/20 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                Ver Todos Los Servicios
              </h3>
              <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm">
                Descubre toda nuestra gama de servicios especializados
              </p>
              <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-md font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 text-xs sm:text-sm">
                <span>Explorar</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Image Section */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Proyecto de construcción" 
            className="w-full h-48 sm:h-64 lg:h-72 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent sm:from-gray-900/80 sm:via-gray-900/50"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 text-white">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 leading-tight">
                Transformamos Ideas En Realidad
              </h3>
              <p className="text-sm sm:text-base text-gray-200 mb-4 sm:mb-6 leading-relaxed">
                Con más de 10 años de experiencia, convertimos tus proyectos en construcciones excepcionales
              </p>
              <button className="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-md font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 text-xs sm:text-sm">
                <span>Iniciar Proyecto</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;