import React from 'react';
import HeaderPage from '../components/main/HeaderPage';
import PageTransition from '../components/animations/PageTransition';
import { motion } from 'framer-motion';
import { Award, Users, Building2, Clock } from 'lucide-react';

const AboutUsPage = () => {
  const stats = [
    {
      icon: Award,
      number: "15+",
      label: "Años de Experiencia",
      description: "Construyendo sueños en la Región de La Araucanía"
    },
    {
      icon: Users,
      number: "100+",
      label: "Proyectos Completados",
      description: "Satisfaciendo las necesidades de nuestros clientes"
    },
    {
      icon: Building2,
      number: "50+",
      label: "Clientes Satisfechos",
      description: "Construyendo relaciones duraderas"
    },
    {
      icon: Clock,
      number: "24/7",
      label: "Soporte",
      description: "Siempre disponibles para nuestros clientes"
    }
  ];

  return (
    <PageTransition variant="slide">
      <div>
        {/* Header */}
        <HeaderPage
          title="Sobre Nosotros"
          backgroundImage="/Infraestructura.jpg"
          height="h-[400px]"
          overlay="bg-black/40"
          subtitle="Construyendo el futuro de La Araucanía"
          titleSize="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
        />

        {/* Historia y Misión */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Imagen */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src="/LogoNav2.png"
                  alt="Constructora Temuco"
                  className="w-full h-64 md:h-80 lg:h-96 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>

              {/* Contenido */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-display font-bold text-gray-900">
                  Nuestra Historia
                </h2>
                <p className="text-gray-600 font-sans leading-relaxed">
                  Constructora Temuco nace con la visión de transformar el paisaje urbano 
                  de La Araucanía, ofreciendo soluciones constructivas innovadoras y de 
                  alta calidad. Con más de 15 años de experiencia, nos hemos consolidado 
                  como líderes en el sector de la construcción en la región.
                </p>
                <p className="text-gray-600 font-sans leading-relaxed">
                  Nuestro compromiso con la excelencia y la satisfacción del cliente nos 
                  ha permitido desarrollar una amplia cartera de proyectos exitosos, 
                  desde viviendas residenciales hasta complejos comerciales y obras 
                  públicas de gran envergadura.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Valores */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center text-gray-900 mb-12">
              Nuestros Valores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  Excelencia
                </h3>
                <p className="text-gray-600 font-sans">
                  Nos comprometemos a entregar la más alta calidad en cada proyecto, 
                  superando las expectativas de nuestros clientes.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  Innovación
                </h3>
                <p className="text-gray-600 font-sans">
                  Buscamos constantemente nuevas soluciones y tecnologías para mejorar 
                  nuestros procesos y resultados.
                </p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                  Compromiso
                </h3>
                <p className="text-gray-600 font-sans">
                  Trabajamos con dedicación y responsabilidad, cumpliendo con los plazos 
                  y presupuestos establecidos.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default AboutUsPage; 