const ContactCTA = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 py-10 w-full">
      <div className="w-full text-center px-4 sm:px-6 lg:px-8">
        <h3 className="text-xl font-bold text-white mb-2">
          ¿Listo para comenzar tu proyecto?
        </h3>
        <p className="text-gray-300 mb-6 text-base">
          Contáctanos hoy y recibe una cotización gratuita
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-xl transition-colors text-sm">
            Llamar Ahora
          </button>
          <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-2 px-6 rounded-xl transition-colors text-sm">
            Ver Proyectos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactCTA;