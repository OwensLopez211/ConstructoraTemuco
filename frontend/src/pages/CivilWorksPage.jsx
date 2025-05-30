import React from 'react';
import HeaderPage from '../components/main/HeaderPage';
import TrustSection from '../components/services/TrustSection'; // Ajusta la ruta según tu estructura

const CivilWorksPage = () => {
  
  // Función para manejar el clic del botón
  const handleContactClick = () => {
    // Puedes agregar navegación o modal de contacto aquí
    console.log("Redirigir a contacto para obras civiles");
    // Por ejemplo: navigate('/contacto');
  };

  return (
    <div>
      {/* Header con imagen de obras civiles */}
      <HeaderPage
        title="Obras Civiles"
        subtitle="Ejecución de obras civiles formato llave en mano"
        backgroundImage="/Maquinaria-Pesada.jpg"
        height="h-[500px]"
        overlay="bg-black/50"
        titleSize="text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
      />

      {/* Sección de confianza para obras civiles */}
      <TrustSection 
        title="Especialistas en obras civiles"
        image="/Maquinaria_pesada.jpg" // Imagen de maquinaria trabajando
        imageAlt="Maquinaria pesada realizando obras civiles"
        buttonText="CONTÁCTANOS"
        onButtonClick={handleContactClick}
        customContent={
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Ejecutamos proyectos llame en mano, para personas naturales y empresas.
            </p>
            
            <p>
              En este tipo de proyectos nos encargamos de todos los tramites para realizar la obra, cumpliendo con los documentos técnicos para poder ejecutar la obra hasta la finalización de esta.
            </p>
            
            <p>
            Entre las características principales de este tipo de trabajos destacamos:
            <li>Precio fijo detallado al inicio del proyecto.</li> 
            <li>Diseño y construcción.</li>  
            <li>Obra completa y terminada, llegar y utilizar.</li> 
            </p>
          </div>
        }
      />
    </div>
  );
};

export default CivilWorksPage;