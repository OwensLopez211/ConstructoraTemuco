import { MapPin } from 'lucide-react';

const ContactMap = () => {
  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border-0 shadow-xl">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
          <MapPin className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Nuestra ubicación</h3>
      </div>
      <div className="rounded-2xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps?q=Volcán+Calbuco+345,+Temuco,+Chile&output=embed"
          width="100%"
          height="140"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Constructora Temuco"
          className="rounded-2xl"
        ></iframe>
      </div>
      <p className="text-gray-600 mt-3 text-xs">
        Volcán Calbuco 345, Temuco, Región de La Araucanía, Chile
      </p>
    </div>
  );
};

export default ContactMap;