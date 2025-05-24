import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Juan Pérez',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
      testimonial: 'Constructora Temuco superó nuestras expectativas, su atención al detalle y profesionalismo fueron clave para el éxito de nuestro proyecto.'
    },
    {
      id: 2,
      name: 'María González',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
      testimonial: 'Estoy muy satisfecha con los resultados. La calidad del trabajo y el trato fueron excepcionales. Recomiendo al 100% a Constructora Temuco.'
    },
    {
      id: 3,
      name: 'Carlos Fernández',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
      testimonial: 'Excelente experiencia trabajando con ellos. Cada fase fue manejada con gran cuidado y responsabilidad. Sin dudas los elegiría nuevamente.'
    },
    {
      id: 4,
      name: 'Ana Martínez',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
      testimonial: 'Como arquitecta, valoro mucho la precisión en la ejecución. Constructora Temuco demostró un nivel técnico excepcional y comunicación fluida.'
    },
    {
      id: 5,
      name: 'Roberto Silva',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
      testimonial: 'Profesionales de primera categoría. Cumplieron con todos los plazos y la calidad del trabajo fue impecable. Muy recomendados.'
    },
    {
      id: 6,
      name: 'Laura Torres',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80',
      testimonial: 'La mejor decisión fue elegir a Constructora Temuco. Su equipo es altamente profesional y el resultado superó todas mis expectativas.'
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.max(1, testimonials.length - 2));
    }, 3500); // Movimiento constante cada 3.5 segundos

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, testimonials.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, testimonials.length - 2)) % Math.max(1, testimonials.length - 2));
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push(testimonials[index]);
    }
    return visible;
  };

  return (
    <section className="bg-gray-50 py-12 px-4 sm:py-16 md:py-20 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="bg-white text-gray-700 font-medium text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded border border-gray-200 tracking-wider">
              TESTIMONIOS
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Lo Que Dicen Nuestros Clientes
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Desktop: 3 cards, Mobile: 1 card */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
              >
                {/* Header with avatar and quote */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover"
                    />
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {testimonial.name}
                    </h4>
                  </div>
                  <Quote className="w-8 h-8 lg:w-10 lg:h-10 text-green-600 flex-shrink-0" />
                </div>

                {/* Testimonial text */}
                <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                  {testimonial.testimonial}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile: Single card carousel */}
          <div className="md:hidden">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* Header with avatar and quote */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {testimonials[currentIndex].name}
                  </h4>
                </div>
                <Quote className="w-8 h-8 text-green-600 flex-shrink-0" />
              </div>

              {/* Testimonial text */}
              <p className="text-gray-600 leading-relaxed">
                {testimonials[currentIndex].testimonial}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group border border-gray-100"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-green-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group border border-gray-100"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-green-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8 sm:mt-12">
          {Array.from({ length: Math.max(1, testimonials.length - 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-green-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;