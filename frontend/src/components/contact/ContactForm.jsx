import { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';

const ContactForm = () => {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    message: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert("¡Mensaje enviado exitosamente!");
    setForm({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 border-0 shadow-xl">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">Envíanos un mensaje</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Nombre completo
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none text-sm"
            placeholder="Tu nombre completo"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none text-sm"
            placeholder="tu@email.com"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Mensaje
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 outline-none resize-none text-sm"
            placeholder="Cuéntanos sobre tu proyecto, necesidades o cualquier consulta que tengas..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-sm"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Enviando...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Enviar Mensaje</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;