import React from 'react';
import HeaderPage from '../components/main/HeaderPage';
import PageTransition from '../components/animations/PageTransition';
import { motion } from 'framer-motion';
import { Target, Eye, Award, Lightbulb, Heart } from 'lucide-react';

const AboutUsPage = () => {

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
              {/* Logo */}
              <motion.img
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                src="/Logo-grande.webp"
                alt="Constructora Temuco"
                className="w-[70%] h-auto object-contain object-center rounded-2xl shadow-xl mx-auto"
              />

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

        {/* Misión y Visión */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Misión y Visión
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Conoce nuestro propósito y hacia dónde nos dirigimos como empresa
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Misión */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-gray-900">
                    Misión
                  </h3>
                </div>
                <p className="text-gray-600 font-sans leading-relaxed">
                  Otorgar un servicio constructivo integral, diseñando y ejecutando soluciones para satisfacer 
                  las necesidades que los proyectos de nuestros clientes requieren.
                </p>
              </motion.div>

              {/* Visión */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-gray-900">
                    Visión
                  </h3>
                </div>
                <p className="text-gray-600 font-sans leading-relaxed">
                  Crecer de manera orgánica y sostenible en el mercado de la construcción de proyectos 
                  públicos y privados, con un portafolio balanceado entre ambas áreas de negocio.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default AboutUsPage;