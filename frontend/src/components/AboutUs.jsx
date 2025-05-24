import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Award, Users, Target, Shield } from 'lucide-react';

const CountUpNumber = ({ end, duration = 2000, suffix = "", className = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function para una animación más suave
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(end * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
};

const AboutUs = () => {
  return (
    <section className="bg-white py-12 px-4 sm:py-24 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          {/* Contenido izquierdo */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-green-50 text-green-700 font-medium text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full">
                  SOBRE NOSOTROS
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Conoce A Constructora Temuco:
                <span className="block text-green-700">
                  Compromiso Y Experiencia
                </span>
              </h2>
              
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                Desde 2016, hemos brindado soluciones constructivas destacadas en 
                Temuco y sus alrededores, siempre adaptándonos a cada desafío y 
                garantizando la calidad en todos nuestros proyectos.
              </p>
            </div>

            <button className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-2 mx-auto lg:mx-0">
              <span>Leer Más</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Contenido derecho - Imágenes y estadísticas */}
          <div className="relative flex flex-col items-center">
            {/* Grid de imágenes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
              {/* Imagen principal - equipo */}
              <div className="col-span-1 sm:col-span-2 relative overflow-hidden rounded-2xl shadow-lg mb-4 sm:mb-0">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Equipo de trabajo" 
                  className="w-full h-48 sm:h-72 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 sm:px-4 sm:py-2">
                  <span className="text-gray-900 text-xs sm:text-sm font-medium">Nuestro Equipo</span>
                </div>
              </div>

              {/* Imagen de proyecto 1 */}
              <div className="relative overflow-hidden rounded-xl shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Proyecto residencial" 
                  className="w-full h-32 sm:h-48 object-cover"
                />
              </div>

              {/* Imagen de proyecto 2 */}
              <div className="relative overflow-hidden rounded-xl shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Edificio moderno" 
                  className="w-full h-32 sm:h-48 object-cover"
                />
              </div>
            </div>

            {/* Estadísticas flotantes: en mobile, ponlas debajo */}
            <div className="flex flex-col sm:block w-full mt-6 sm:mt-0">
              <div className="bg-green-700 text-white p-4 sm:p-6 rounded-2xl shadow-xl mb-4 sm:absolute sm:-top-6 sm:-right-6 sm:w-auto text-center">
                <div className="text-2xl sm:text-3xl font-bold">
                  <CountUpNumber 
                    end={10} 
                    suffix="+" 
                    className="text-2xl sm:text-3xl font-bold"
                    duration={2500}
                  />
                </div>
                <div className="text-xs sm:text-sm font-medium mt-1 opacity-90">Años de Experiencia</div>
              </div>
              <div className="bg-gray-900 text-white p-4 sm:p-6 rounded-2xl shadow-xl text-center sm:absolute sm:-bottom-6 sm:-left-6 sm:w-auto">
                <div className="text-2xl sm:text-3xl font-bold text-green-500">
                  <CountUpNumber 
                    end={15} 
                    suffix="K" 
                    className="text-2xl sm:text-3xl font-bold text-green-500"
                    duration={3000}
                  />
                </div>
                <div className="text-xs sm:text-sm font-medium mt-1 text-gray-300">Clientes Felices</div>
              </div>
            </div>
          </div>
        </div>

        {/* Estadísticas inferiores */}
        <div className="mt-12 sm:mt-24 pt-8 sm:pt-16 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-green-700 mb-2 sm:mb-3">
                <CountUpNumber 
                  end={200} 
                  suffix="+" 
                  className="text-2xl sm:text-4xl font-bold text-green-700"
                  duration={2500}
                />
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-base">Proyectos Completados</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-green-700 mb-2 sm:mb-3">
                <CountUpNumber 
                  end={50} 
                  suffix="+" 
                  className="text-2xl sm:text-4xl font-bold text-green-700"
                  duration={2000}
                />
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-base">Profesionales</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-green-700 mb-2 sm:mb-3">
                <CountUpNumber 
                  end={15} 
                  suffix="K" 
                  className="text-2xl sm:text-4xl font-bold text-green-700"
                  duration={3000}
                />
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-base">Clientes Satisfechos</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-green-700 mb-2 sm:mb-3">
                <CountUpNumber 
                  end={100} 
                  suffix="%" 
                  className="text-2xl sm:text-4xl font-bold text-green-700"
                  duration={2200}
                />
              </div>
              <div className="text-gray-600 font-medium text-xs sm:text-base">Garantía</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;