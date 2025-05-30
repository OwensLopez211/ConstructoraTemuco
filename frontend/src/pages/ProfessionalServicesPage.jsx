import React from 'react';
import HeaderPage from '../components/main/HeaderPage';

const ProfessionalServicesPage = () => {
  return (
    <div>
      {/* Header con imagen de ProfessionalService */}
      <HeaderPage
        title="Desarrollo de proyectos públicos de obras de infraestructura"
        backgroundImage="/Infraestructura.jpg"
        height="h-[500px]"
        overlay="bg-black/50"
        subtitle="Construcción de infraestructura vital para el desarrollo de comunidades"
        titleSize="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
      />

    </div>
  );
};

export default ProfessionalServicesPage; 