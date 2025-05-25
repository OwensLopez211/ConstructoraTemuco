import { Phone, Mail, Clock } from 'lucide-react';

const ContactCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6 items-stretch">
      <div className="h-full flex flex-col justify-between">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center text-center">
          <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mb-2">
            <Phone className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-0.5 text-sm">Teléfono</h3>
          <p className="text-gray-600 text-xs">+56 45 2 810749</p>
        </div>
      </div>
      <div className="h-full flex flex-col justify-between">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center text-center">
          <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center mb-2">
            <Mail className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-0.5 text-sm">Email</h3>
          <p className="text-gray-600 text-xs">contacto@temuco.cl</p>
        </div>
      </div>
      <div className="h-full flex flex-col justify-between">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center text-center">
          <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mb-2">
            <Clock className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-0.5 text-sm">Horario</h3>
          <p className="text-gray-600 text-xs">Lun - Vie: 8:00 AM - 6:00 PM</p>
        </div>
      </div>
    </div>
  );
};

export default ContactCards;