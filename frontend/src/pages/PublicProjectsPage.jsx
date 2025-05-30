import React from 'react';
import HeaderPage from '../components/main/HeaderPage';
import TrustSection from '../components/services/TrustSection'; // Ajusta la ruta según tu estructura

const PublicProjectsPage = () => {
  
  // Función para manejar el clic del botón
  const handleContactClick = () => {
    // Puedes agregar navegación o modal de contacto aquí
    console.log("Redirigir a contacto para proyectos públicos");
    // Por ejemplo: navigate('/contacto');
  };

  return (
    <div>
      {/* Header con imagen de infraestructura pública */}
      <HeaderPage
        title="Desarrollo de proyectos públicos de obras de infraestructura"
        backgroundImage="/Infraestructura.jpg"
        height="h-[500px]"
        overlay="bg-black/50"
        subtitle="Construcción de infraestructura vital para el desarrollo de comunidades"
        titleSize="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
      />

      {/* Sección de confianza para proyectos públicos */}
      <TrustSection 
        title="Proyectos públicos"
        image="/Public-Obra.jpg" // Imagen de construcción pública
        imageAlt="Trabajadores en obra de construcción pública"
        buttonText="CONTÁCTANOS"
        onButtonClick={handleContactClick}
        customContent={
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Participamos en proyectos públicos de obras de infraestructura nueva y 
              conservación de edificios, publicados en el portal "mercado público", y para 
              ello contamos con registro MINVU y registro MOP vigentes.
            </p>
          </div>
        }
        // Estadísticas específicas para proyectos públicos
        stats={[
          { number: "MINVU", label: "Registro Vigente", color: "text-blue-600" },
          { number: "MOP", label: "Registro Vigente", color: "text-green-600" },
          { number: "50+", label: "Licitaciones Ganadas", color: "text-orange-600" }
        ]}
      />

    </div>
  );
};

export default PublicProjectsPage;