import React from 'react';
import HeaderPage from '../components/main/HeaderPage';
import TrustSection from '../components/services/TrustSection';
import PageTransition from '../components/animations/PageTransition';

const ProfessionalServicesPage = () => {
  const handleContactClick = () => {
    console.log("Redirigir a contacto para servicios profesionales");
  };

  return (
    <PageTransition variant="slide">
      <div>
        {/* Header con imagen de servicios profesionales */}
        <HeaderPage
          title="Servicios Profesionales"
          backgroundImage="/Infraestructura.jpg"
          height="h-[400px]"
          overlay="bg-black/40"
          subtitle="Mantención y reparación especializada"
          titleSize="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
        />

        {/* Sección de confianza para servicios profesionales */}
        <TrustSection 
          title="Servicios profesionales"
          image="/Public-Obra.jpg"
          imageAlt="Servicios profesionales de construcción"
          buttonText="CONTÁCTANOS"
          onButtonClick={handleContactClick}
          customContent={
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-sans">
              <p>
                Ofrecemos servicios especializados de mantención y reparación para preservar 
                y mejorar tus espacios construidos, con el más alto nivel de profesionalismo 
                y calidad.
              </p>
            </div>
          }
          stats={[
            { number: "100%", label: "Satisfacción", color: "text-green-600" },
            { number: "24/7", label: "Soporte", color: "text-blue-600" },
            { number: "15+", label: "Años de Experiencia", color: "text-orange-600" }
          ]}
        />
      </div>
    </PageTransition>
  );
};

export default ProfessionalServicesPage; 