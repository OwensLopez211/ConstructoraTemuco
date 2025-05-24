import { Phone, Mail, MapPin } from "lucide-react";

const ContactInfo = () => (
  <div className="bg-gray-50 rounded-xl shadow p-6 space-y-4 max-w-lg mx-auto mt-8">
    <div className="flex items-center space-x-3">
      <Phone className="text-primary" />
      <span>+56 9 8765 4321</span>
    </div>
    <div className="flex items-center space-x-3">
      <Mail className="text-primary" />
      <span>info@constructoratemuco.cl</span>
    </div>
    <div className="flex items-center space-x-3">
      <MapPin className="text-primary" />
      <span>Temuco, Región de La Araucanía</span>
    </div>
    {/* Aquí puedes agregar íconos de redes sociales si lo deseas */}
  </div>
);

export default ContactInfo;