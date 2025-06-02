import React, { useState, useEffect } from 'react';
import HeaderPage from '../components/main/HeaderPage';
import PageTransition from '../components/animations/PageTransition';
import { motion } from 'framer-motion';
import { MapPin, Loader2 } from 'lucide-react';
import ProjectDetailsModal from '../components/modals/ProjectDetailsModal';

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState('todos');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'privado', label: 'Privados' },
    { id: 'gubernamental', label: 'Gubernamentales' },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://ctemuco.cl/api/projects/public');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (data.success) {
          setProjects(data.data);
        } else {
          setError(data.message || 'Error fetching projects');
        }
      } catch (e) {
        console.error("Failed to fetch projects:", e);
        setError('Error al cargar los proyectos. Inténtalo de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = activeCategory === 'todos'
    ? projects
    : projects.filter(project => project.type === activeCategory);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <PageTransition variant="slide">
      <div>
        <HeaderPage
          title="Nuestros Proyectos"
          backgroundImage="/ProjectsHeader.jpg"
          height="h-[400px]"
          overlay="bg-black/40"
          subtitle="Descubre nuestra cartera de proyectos exitosos"
          titleSize="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
        />

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-display font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-green-50'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {loading && (
              <div className="text-center py-10">
                <Loader2 className="w-10 h-10 text-green-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-700 font-sans">Cargando proyectos...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-10 text-red-600 font-sans">
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && filteredProjects.length === 0 && (
               <div className="text-center py-10 text-gray-700 font-sans">
                 <p>No se encontraron proyectos en esta categoría.</p>
               </div>
            )}

            {!loading && !error && filteredProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => openModal(project)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.images && project.images.length > 0 ? project.images[0].thumbnail_url : '/placeholder-project.jpg'}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 font-sans mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      <div className="flex items-center text-gray-500 font-sans text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {project.location}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        <ProjectDetailsModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />

      </div>
    </PageTransition>
  );
};

export default ProjectsPage; 