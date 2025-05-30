import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from '../animations/CountUp';

// Componente separado para las estadísticas con count up
const StatsSection = () => {
  return (
    <div className="relative z-10 w-full bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        
        {/* Stat 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <CountUp
            from={0}
            to={1520}
            separator="."
            direction="up"
            duration={3}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-1 font-mono leading-none"
            prefix="+"
          />
          <p className="text-blue-100 text-sm md:text-base font-medium mt-2">
            Proyectos particulares
          </p>
        </motion.div>
        
        {/* Stat 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <CountUp
            from={0}
            to={979}
            separator="."
            direction="up"
            duration={3}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-1 font-mono leading-none"
            prefix="+"
          />
          <p className="text-blue-100 text-sm md:text-base font-medium mt-2">
            Proyectos a empresas
          </p>
        </motion.div>
        
        {/* Stat 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <CountUp
            from={0}
            to={600}
            separator="."
            direction="up"
            duration={3}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-1 font-mono leading-none"
            prefix="+"
          />
          <p className="text-blue-100 text-sm md:text-base font-medium mt-2">
            Proyectos estatales
          </p>
        </motion.div>
        
      </div>
    </div>
  );
};

// Componente Count Up personalizado

export default StatsSection; 