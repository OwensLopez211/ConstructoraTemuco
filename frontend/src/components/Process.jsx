import React from 'react';
import { FileText, Hammer, Shield, BarChart3 } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      step: '01',
      title: 'Planificación Rigurosa',
      description: 'Establecemos un plan detallado que considera cada etapa del proyecto, asegurando una ejecución efectiva y respetando los plazos establecidos.',
      icon: FileText
    },
    {
      step: '02',
      title: 'Ejecución Precisa',
      description: 'Nuestro equipo trabaja con dedicación y profesionalismo, supervisando cada detalle para garantizar que todos los estándares se cumplan a cabalidad.',
      icon: Hammer
    },
    {
      step: '03',
      title: 'Control De Calidad',
      description: 'Implementamos rigurosos controles de calidad en cada fase, asegurando que los resultados cumplan con nuestras altas expectativas y las de nuestros clientes.',
      icon: Shield
    },
    {
      step: '04',
      title: 'Evaluación Continua',
      description: 'Realizamos evaluaciones periódicas de los avances, utilizando la retroalimentación para optimizar procesos y mejorar la satisfacción del cliente.',
      icon: BarChart3
    }
  ];

  return (
    <section className="bg-gray-850 py-12 px-4 sm:py-16 md:py-24 sm:px-6" style={{backgroundColor: '#1a1a1a'}}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="bg-green-700/20 text-green-400 font-medium text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-green-700/30">
              ASÍ TRABAJAMOS EN CONSTRUCTORA TEMUCO
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
            Nuestro Enfoque Para Cada 
            <span className="block text-green-400">Proyecto Constructivo</span>
          </h2>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.step}
                className="group relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-600/30 hover:border-green-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-green-700/10 overflow-hidden"
                style={{background: 'linear-gradient(135deg, #262626 0%, #1a1a1a 100%)'}}
              >
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-700/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Step Number Badge - Responsive positioning */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-base sm:text-lg">{step.step}</span>
                </div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>

                  {/* Step Label */}
                  <div className="inline-block bg-green-700/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-green-600/30 mb-3 sm:mb-4">
                    <span className="text-green-400 font-semibold text-xs sm:text-sm tracking-wider">
                      STEP {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-green-400 transition-colors duration-300 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
                    {step.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-green-700/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 md:mt-20 text-center">
          <div className="bg-gradient-to-r from-green-700/20 to-green-600/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-green-700/30">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
              ¿Listo Para Comenzar Tu Proyecto?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Nuestro equipo está preparado para llevar tu visión a la realidad con 
              el más alto nivel de profesionalismo y calidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="bg-green-700 hover:bg-green-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                Solicitar Cotización
              </button>
              <button className="border-2 border-gray-500 hover:border-green-700 text-white hover:text-green-400 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base">
                Ver Proyectos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;