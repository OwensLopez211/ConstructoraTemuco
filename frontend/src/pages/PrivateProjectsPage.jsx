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

        {/* CTA final */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
            ¿Listo para transformar tu hogar?
          </h3>
          <p className="text-lg md:text-xl mb-8 text-white/90 font-sans">
            Contacta con nuestros expertos y comienza tu proyecto hoy mismo
          </p>
          <button 
            onClick={handleContactClick}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-display font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <span>Solicitar Cotización Gratuita</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </PageTransition>
  );
};

export default PrivateProjectsPage;