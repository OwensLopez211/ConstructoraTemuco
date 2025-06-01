import React from 'react';
import HeaderPage from '../components/main/HeaderPage';
import TrustSection from '../components/services/TrustSection';
import PageTransition from '../components/animations/PageTransition';

const CivilWorksPage = () => {
  const handleContactClick = () => {
    console.log("Redirigir a contacto para obras civiles");
  };

  return (
    <PageTransition variant="slide">
      <div>
        {/* Header con imagen de obras civiles */}
        <HeaderPage
          title="Obras Civiles"
          backgroundImage="/Infraestructura.jpg"
          height="h-[400px]"
          overlay="bg-black/40"
          subtitle="Construcción de infraestructura vital para el desarrollo de comunidades"
          titleSize="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
        />

        {/* Sección de confianza para obras civiles */}
        <TrustSection 
          title="Obras civiles"
          image="/Public-Obra.jpg"
          imageAlt="Obras civiles de construcción"
          buttonText="CONTÁCTANOS"
          onButtonClick={handleContactClick}
          customContent={
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed font-sans">
              <p>
                Desarrollamos proyectos de infraestructura pública que mejoran la calidad de vida 
                de las comunidades, con un enfoque en la sostenibilidad y la innovación.
              </p>
            </div>
          }
          stats={[
            { number: "50+", label: "Proyectos Completados", color: "text-green-600" },
            { number: "100%", label: "Cumplimiento", color: "text-blue-600" },
            { number: "20+", label: "Años de Experiencia", color: "text-orange-600" }
          ]}
        />
      </div>
    </PageTransition>
  );
};

export default CivilWorksPage;