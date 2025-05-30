import React from 'react';

// Componente HeaderPage reutilizable mejorado
const HeaderPage = ({ 
  title, 
  subtitle,
  backgroundImage, 
  gradient = "bg-gradient-to-r from-blue-600 to-purple-600",
  overlay = "bg-black/40", // Overlay más oscuro para mejor legibilidad
  height = "h-[500px]", 
  textAlign = "center",
  titleSize = "text-3xl md:text-4xl lg:text-5xl",
  children 
}) => {
  return (
    <header className={`relative ${height} flex items-center justify-center overflow-hidden`}>
      {/* Si hay imagen de fondo */}
      {backgroundImage && (
        <>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform transition-transform duration-700 hover:scale-110"
            style={{ 
              backgroundImage: `url(${backgroundImage})`,
            }}
          />
          {/* Overlay para mejorar legibilidad del texto */}
          <div className={`absolute inset-0 ${overlay}`} />
          {/* Gradiente adicional desde abajo para mejor contraste */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </>
      )}
      
      {/* Si no hay imagen, usar gradiente */}
      {!backgroundImage && (
        <div className={`absolute inset-0 ${gradient}`} />
      )}
      
      {/* Contenido */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className={`${textAlign === 'center' ? 'text-center' : textAlign === 'left' ? 'text-left' : 'text-right'}`}>
          <h1 className={`${titleSize} font-bold text-white leading-tight drop-shadow-lg`}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-white/90 text-lg md:text-xl drop-shadow-md">
              {subtitle}
            </p>
          )}
          {children && (
            <div className="mt-6 text-white/90 drop-shadow-md">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Efecto de partículas opcional */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-500"></div>
      </div>
    </header>
  );
};

export default HeaderPage;