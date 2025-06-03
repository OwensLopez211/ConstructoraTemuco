import React from 'react';
import HeaderPage from "../components/main/HeaderPage";
import TrustSection from "../components/services/TrustSection";
import PageTransition from "../components/animations/PageTransition";

const PrivateProjectsPage = () => {
  
  // Función para manejar el clic del botón
  const handleContactClick = () => {
    // Puedes agregar navegación o modal de contacto aquí
    console.log("Redirigir a contacto");
    // Por ejemplo: navigate('/contacto');
  };

  return (
    <PageTransition variant="slide">
      <div>
        {/* Header con imagen de Private Projects */}
        <HeaderPage
          title="Desarrollo de proyectos privados de modificación o ampliación de casas"
          backgroundImage="/Private-Obra.jpg"
          height="h-[400px]"
          overlay="bg-black/40"
          subtitle="Construcción de infraestructura vital para el desarrollo de comunidades"
          titleSize="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
        />

        {/* Sección de confianza */}
        <TrustSection 
          title="Contrata con tranquilidad"
          image="/Architecto.jpg" // Asegúrate de tener esta imagen
          imageAlt="Arquitecto planificando proyecto de ampliación"
          buttonText="CONTÁCTANOS"
          onButtonClick={handleContactClick}
        />
      </div>
    </PageTransition>
  );
};

export default PrivateProjectsPage;