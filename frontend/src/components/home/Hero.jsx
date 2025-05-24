import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Phone, Mail, MapPin, Award, Users, Building } from 'lucide-react';

const CountUpNumber = ({ end, duration = 2000, suffix = "" }) => {
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
    <span ref={ref} className="text-3xl font-bold text-green-400">
      {count}{suffix}
    </span>
  );
};

const ConstructoraTemucoHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const backgroundImages = [
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80',
    'https://images.unsplash.com/photo-1590496793929-89f4d9d0d6f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[calc(100vh-64px)] sm:pt-0 sm:h-[90vh] md:h-[80vh] overflow-hidden bg-slate-900">
      {/* Background Images Carousel */}
      <div className="absolute inset-0">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-70' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Proyecto ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      <style jsx>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(21, 128, 61, 0.3); }
          50% { box-shadow: 0 0 30px rgba(21, 128, 61, 0.6); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Main Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-full px-4 py-2">
                <Award className="w-4 h-4 text-green-300" />
                <span className="text-green-200 text-sm font-medium">CONSTRUIMOS TU FUTURO</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                Calidad <span className="block bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">Y Eficiencia</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                En Constructora Temuco, transformamos tus sueños en realidad con soluciones constructivas innovadoras y adaptadas a tus necesidades. Tu satisfacción es nuestra prioridad.
              </p>
            </div>

            {/* Statistics with Count Up */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <CountUpNumber end={200} suffix="+" />
                <div className="text-gray-400 text-sm">Proyectos</div>
              </div>
              <div className="text-center">
                <CountUpNumber end={15} suffix="+" />
                <div className="text-gray-400 text-sm">Años</div>
              </div>
              <div className="text-center">
                <CountUpNumber end={100} suffix="%" />
                <div className="text-gray-400 text-sm">Satisfacción</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center space-x-2">
                <span>Ver Proyectos</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="group border-2 border-white/30 hover:border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Llamar Ahora</span>
              </button>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-6 animate-float hidden sm:block">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Construcción Integral</h3>
                  <p className="text-gray-300">Desde cimientos hasta acabados finales con los más altos estándares de calidad.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Equipo Especializado</h3>
                  <p className="text-gray-300">Profesionales certificados con amplia experiencia en el sector.</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Garantía Total</h3>
                  <p className="text-gray-300">Respaldamos nuestro trabajo con garantías extendidas en todos nuestros proyectos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Bar */}
      <div className="hidden sm:block absolute bottom-0 left-0 right-0 z-20">
        <div className="bg-black/50 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-6 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span>+56 9 8765 4321</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-green-400" />
                  <span>info@constructoratemuco.cl</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <span>Temuco, Región de La Araucanía</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                {[0, 1, 2].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-green-500 scale-125' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConstructoraTemucoHero;