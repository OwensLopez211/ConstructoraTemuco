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
    <section className="bg-gray-50 py-12 px-4 sm:py-16 md:py-24 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="bg-green-50 text-green-700 font-medium text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full">
              NUESTROS SERVICIOS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-4">
            Servicios Integrales De 
            <span className="block text-green-700">Construcción En Temuco</span>
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="group bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-100 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-50 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-green-700" />
                  </div>
                  <span className="text-green-700 font-bold text-base sm:text-lg">{service.id}.</span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 group-hover:text-green-700 transition-colors duration-300 leading-tight">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  {service.description}
                </p>
                
                <div className="flex items-center text-green-700 font-medium group-hover:translate-x-2 transition-transform duration-300 text-sm sm:text-base">
                  <span className="mr-2">Leer Más</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}

          {/* CTA Card */}
          <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-700/20 to-transparent"></div>
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Ver Todos Los Servicios
              </h3>
              <p className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
                Descubre toda nuestra gama de servicios especializados
              </p>
              <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 text-sm sm:text-base">
                <span>Explorar</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Image Section */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Proyecto de construcción" 
            className="w-full h-64 sm:h-80 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent sm:from-gray-900/80 sm:via-gray-900/50"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl mx-auto px-6 sm:px-8 text-white">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
                Transformamos Ideas En Realidad
              </h3>
              <p className="text-lg sm:text-xl text-gray-200 mb-6 sm:mb-8 leading-relaxed">
                Con más de 10 años de experiencia, convertimos tus proyectos en construcciones excepcionales
              </p>
              <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center space-x-2 text-sm sm:text-base">
                <span>Iniciar Proyecto</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;