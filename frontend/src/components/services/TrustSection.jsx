import React from 'react';

const TrustSection = ({ 
  title = "Contrata con tranquilidad", 
  image = "/images/architect-planning.jpg",
  imageAlt = "Profesional planificando proyecto",
  buttonText = "CONTÁCTANOS",
  onButtonClick,
  className = "",
  customContent, // Nuevo: contenido personalizado
  stats = [ // Nuevo: estadísticas personalizables
    
  ]
}) => {
  
  // Contenido por defecto si no se proporciona customContent
  const defaultContent = (
    <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
      <p>
        Uno de los puntos más complicados al momento de querer hacer una 
        modificación o ampliación en tu hogar, es elegir de manera correcta a los 
        profesionales que llevarán a cabo este trabajo.
      </p>
      
      <p>
        A diferencia de un "maestro" que no te brinda ninguna seguridad y muy 
        probablemente no cumpla con los plazos, cuando contratas nuestros 
        servicios tendrás completa claridad de plazos, cobros y tiempos en que se 
        ejecutarán tu obra.
      </p>
      
      <p>
        Nos dedicamos al desarrollo de proyectos de modificación o ampliación de 
        casas, ofreciendo soluciones que agreguen valor a la propiedad, respetando 
        la arquitectura y materialidad de la vivienda a intervenir.
      </p>
    </div>
  );

  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Imagen a la izquierda */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={image}
                  alt={imageAlt}
                  className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Overlay sutil para mejorar contraste */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500 rounded-full opacity-10"></div>
            </div>

            {/* Contenido a la derecha */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                {title}
              </h2>
              
              {/* Usar contenido personalizado o contenido por defecto */}
              {customContent || defaultContent}

              {/* Botón de llamada a la acción */}
              <div className="pt-4">
                <button
                  onClick={onButtonClick}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-lg tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  {buttonText}
                </button>
              </div>

              {/* Elementos de confianza personalizables */}
              <div className={`grid grid-cols-${stats.length} gap-6 pt-8 border-t border-gray-200`}>
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;