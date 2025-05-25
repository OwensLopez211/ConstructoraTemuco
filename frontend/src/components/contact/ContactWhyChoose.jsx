const ContactWhyChoose = () => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border-0 shadow-xl">
      <h3 className="text-lg font-bold text-gray-900 mb-4">¿Por qué elegirnos?</h3>
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Experiencia comprobada</h4>
            <p className="text-gray-600 text-xs">Más de 15 años en el mercado de la construcción</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Calidad garantizada</h4>
            <p className="text-gray-600 text-xs">Materiales de primera y mano de obra especializada</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm">Atención personalizada</h4>
            <p className="text-gray-600 text-xs">Cada proyecto es único y merece atención especial</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWhyChoose;