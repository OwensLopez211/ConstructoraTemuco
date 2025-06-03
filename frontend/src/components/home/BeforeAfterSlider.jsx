import React, { useState, useRef } from 'react';

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const projects = [
    {
      id: 4,
      title: "Colegio",
      beforeImage: "/jardin-antes.jpg",
      afterImage: "/jardin-despues.jpg",
      category: "Educacional"
    },
    {
      id: 1,
      title: "Casa Familiar",
      beforeImage: "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Residencial"
    },
    {
      id: 2,
      title: "Oficinas",
      beforeImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Comercial"
    },
    {
      id: 3,
      title: "Edificio Histórico",
      beforeImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Patrimonial"
    }
  ];

  const [currentProject, setCurrentProject] = useState(0);

  const updateSliderPosition = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0]?.clientX) || 0;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const currentProjectData = projects[currentProject];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header original */}
        <div className="text-center mb-12 md:mb-8">
          <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent text-sm font-display font-semibold tracking-wider uppercase mb-4 block">
            Nuestros Resultados
          </span>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Trabajos de 
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> calidad</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 font-sans">
            A particulares y empresas
          </p>
        </div>

        {/* Navegación optimizada para móvil */}
        <div className="flex justify-center gap-1 sm:gap-2 mb-6 md:mb-8 px-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => {
                setCurrentProject(index);
                setSliderPosition(50);
              }}
              className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs font-display font-medium rounded-full transition-all duration-200 flex-shrink-0 ${
                currentProject === index
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="block sm:hidden">
                {project.category === 'Educacional' && 'Edu.'}
                {project.category === 'Residencial' && 'Res.'}
                {project.category === 'Comercial' && 'Com.'}
                {project.category === 'Patrimonial' && 'Pat.'}
              </span>
              <span className="hidden sm:block">
                {project.category}
              </span>
            </button>
          ))}
        </div>

        {/* Slider principal */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-3 md:p-4">
            <div
              ref={containerRef}
              className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-xl overflow-hidden cursor-col-resize bg-gray-200"
              onMouseMove={updateSliderPosition}
            >
              {/* Imagen después (fondo) */}
              <img
                src={currentProjectData.afterImage}
                alt="Después"
                className="absolute inset-0 w-full h-full object-cover select-none"
                draggable={false}
              />

              {/* Imagen antes (overlay) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={currentProjectData.beforeImage}
                  alt="Antes"
                  className="w-full h-full object-cover select-none"
                  style={{ width: `${(100 / sliderPosition) * 100}%` }}
                  draggable={false}
                />
              </div>

              {/* Línea divisoria */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-white/80 backdrop-blur-sm z-10"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                {/* Handle del slider */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center cursor-col-resize transition-transform hover:scale-110 active:scale-95">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-gray-600">
                      <path d="M8 6L6 8L10 12L6 16L8 18L14 12L8 6Z" fill="currentColor"/>
                      <path d="M16 6L14 8L18 12L14 16L16 18L22 12L16 6Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Etiquetas sutiles */}
              <div className="absolute top-3 left-3 z-20">
                <span className="bg-black/60 text-white px-2 py-1 rounded text-xs font-display font-medium backdrop-blur-sm">
                  Antes
                </span>
              </div>
              <div className="absolute top-3 right-3 z-20">
                <span className="bg-black/60 text-white px-2 py-1 rounded text-xs font-display font-medium backdrop-blur-sm">
                  Después
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;