import { useState } from "react";

const ContactForm = () => {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // Aquí puedes manejar el envío (API, EmailJS, etc)
    alert("Mensaje enviado (simulado)");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Mensaje</label>
        <textarea
          name="mensaje"
          value={form.mensaje}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-md transition"
      >
        Enviar Mensaje
      </button>
    </form>
  );
};

export default ContactForm;