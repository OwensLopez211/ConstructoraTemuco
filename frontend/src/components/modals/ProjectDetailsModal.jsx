import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, DollarSign, Tag, CirclePercent, Building } from 'lucide-react'; // Iconos

const ProjectDetailsModal = ({ project, onClose, isOpen }) => {
  const [mainImage, setMainImage] = useState(null);

  // Set the main image when the project changes or the modal opens
  useEffect(() => {
    if (project && project.images && project.images.length > 0) {
      // Find the main image or just use the first one
      const initialImage = project.images.find(img => img.is_main) || project.images[0];
      setMainImage(initialImage.thumbnail_url || initialImage.url || '/placeholder-project-large.jpg');
    } else if (project) {
       setMainImage('/placeholder-project-large.jpg');
    }
  }, [project]); // Depend on project data changing

  // Reset main image when modal closes
  useEffect(() => {
    if (!isOpen) {
      setMainImage(null);
    }
  }, [isOpen]);

  // Handle keyboard escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    } else {
      document.removeEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Variants for modal animation
  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.2, ease: "easeIn" } }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!project) return null; // Don't render if no project is selected

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose} // Close when clicking outside
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/30 hover:bg-white/50 rounded-full transition-colors duration-200"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Project Image (Main) */}
            <div className="relative h-64 md:h-80 lg:h-96 bg-gray-200 overflow-hidden">
              {mainImage && (
                <img
                  src={mainImage}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              )}
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
               <h3 className="absolute bottom-4 left-4 text-white font-display text-2xl md:text-3xl font-bold drop-shadow-md">
                  {project.name}
               </h3>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-6 overflow-y-auto flex-grow custom-scrollbar">

              {/* Overview / Description */}
              <div className="mb-6">
                 <h4 className="text-xl font-display font-semibold text-gray-800 mb-3">Descripción</h4>
                 <p className="text-gray-700 font-sans leading-relaxed">{project.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-gray-700 font-sans">
                 <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span><strong className="font-semibold text-gray-800">Ubicación:</strong> {project.location}</span>
                 </div>
                 <div className="flex items-center">
                    <Building className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span><strong className="font-semibold text-gray-800">Tipo:</strong> {project.type_name}</span>
                 </div>
                 {project.end_date && (
                    <div className="flex items-center">
                       <Calendar className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                       <span><strong className="font-semibold text-gray-800">Fecha Fin:</strong> {project.end_date}</span>
                    </div>
                 )}
                 <div className="flex items-center">
                    <DollarSign className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <span><strong className="font-semibold text-gray-800">Presupuesto:</strong> {project.formatted_budget}</span>
                 </div>
              </div>

               {/* Additional Images Gallery (optional) */}
               {project.images && project.images.length > 1 && (
                 <div className="mt-8">
                   <h4 className="text-xl font-display font-semibold text-gray-800 mb-4">Galería</h4>
                   <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
                     {project.images.map((image, index) => (
                       <motion.img
                         key={image.id || index}
                         src={image.thumbnail_url || image.url}
                         alt={`${project.name} - Imagen ${index + 1}`}
                         className="w-full h-20 md:h-24 object-cover rounded-md cursor-pointer transition-opacity duration-200 hover:opacity-80"
                         onClick={() => setMainImage(image.thumbnail_url || image.url)}
                         initial={{ opacity: 0.8 }}
                         whileHover={{ opacity: 1, scale: 1.05 }}
                         whileTap={{ scale: 0.95 }}
                         transition={{ duration: 0.2 }}
                       />
                     ))}
                   </div>
                 </div>
               )}

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal; 