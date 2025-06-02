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
    <section className="bg-gray-850 py-12 px-3 sm:py-16 md:py-20 sm:px-4 rounded-b-2xl" style={{backgroundColor: '#1a1a1a'}}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="inline-block mb-2 sm:mb-3">
            <span className="bg-green-700/20 text-green-400 font-medium text-xs px-3 py-1.5 rounded-full border border-green-700/30">
              ASÍ TRABAJAMOS EN CONSTRUCTORA TEMUCO
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-3xl">
            Nuestro Enfoque Para Cada 
            <span className="block text-green-400">Proyecto Constructivo</span>
          </h2>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {steps.map((step) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.step}
                className="group relative rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-600/30 hover:border-green-600/50 transition-all duration-500 hover:shadow-xl hover:shadow-green-700/10 overflow-hidden"
                style={{background: 'linear-gradient(135deg, #262626 0%, #1a1a1a 100%)'}}
              >
                {/* Background Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-700/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  {/* Step Label */}
                  <div className="inline-block bg-green-700/20 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-green-600/30 mb-2 sm:mb-3">
                    <span className="text-green-400 font-semibold text-xs tracking-wider">
                      STEP {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-green-400 transition-colors duration-300 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base">
                    {step.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-green-700/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;