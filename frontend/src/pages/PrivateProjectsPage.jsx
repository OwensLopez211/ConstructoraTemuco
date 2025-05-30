import React from 'react';
import HeaderPage from "../components/main/HeaderPage";
import TrustSection from "../components/services/TrustSection";

const PrivateProjectsPage = () => {
  
  // Función para manejar el clic del botón
  const handleContactClick = () => {
    // Puedes agregar navegación o modal de contacto aquí
    console.log("Redirigir a contacto");
    // Por ejemplo: navigate('/contacto');
  };

  return (
    <div>
      {/* Header con imagen de Private Projects */}
      <HeaderPage
        title="Desarrollo de proyectos privados de modificación o ampliación de casas"
        backgroundImage="/Private-Obra.jpg"
        height="h-[500px]"
        overlay="bg-black/50"
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

      {/* Aquí puedes agregar más secciones */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Sección de servicios */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Nuestros Servicios de Proyectos Privados
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              Ofrecemos soluciones integrales para la modificación y ampliación de viviendas, 
              desde el diseño hasta la construcción final.
            </p>
          </div>

          {/* Grid de servicios */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2-10v6m3-6v6m0-6V9a2 2 0 012-2h2a2 2 0 012 2v2m-6 4v4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Ampliaciones</h3>
              <p className="text-gray-600">Agregamos espacios adicionales manteniendo la armonía arquitectónica de tu hogar.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Remodelaciones</h3>
              <p className="text-gray-600">Renovamos espacios existentes con diseños modernos y funcionales.</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Consultoría</h3>
              <p className="text-gray-600">Asesoramiento profesional desde la planificación hasta la ejecución.</p>
            </div>
          </div>

          {/* CTA final */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ¿Listo para transformar tu hogar?
            </h3>
            <p className="text-lg md:text-xl mb-8 text-white/90">
              Contacta con nuestros expertos y comienza tu proyecto hoy mismo
            </p>
            <button 
              onClick={handleContactClick}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
            >
              <span>Solicitar Cotización Gratuita</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateProjectsPage;