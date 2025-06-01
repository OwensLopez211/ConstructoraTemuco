import ContactHero from "../components/contact/ContactHero";
import ContactCards from "../components/contact/ContactCards";
import ContactForm from "../components/contact/ContactForm";
import ContactWhyChoose from "../components/contact/ContactWhyChoose";
import ContactMap from "../components/contact/ContactMap";
import ContactCTA from "../components/contact/ContactCTA";
import HeaderPage from "../components/main/HeaderPage";

const ContactPage = () => {
  return (
    <div className="w-full min-h-screen bg-white pt-0">
      {/* Hero Section - Usando HeaderPage */}
      <HeaderPage
        title="Hablemos"
        subtitle="¿Tienes un proyecto en mente? Nos encantaría escucharte y ayudarte a convertir tus ideas en realidad."
        backgroundImage="/Infraestructura.jpg"
        height="h-[400px]"
        overlay="bg-black/40"
        titleSize="text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
      />

      {/* Contenedor principal para el resto del contenido con padding */}
      <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-10 py-10 lg:py-16">
        
        {/* Contact Cards */}
        <div className="mb-6">
           <ContactCards />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-1 gap-6 items-stretch">
          
          {/* Right Side - Additional Info */}
          <div className="space-y-5">
            <ContactWhyChoose />
            <ContactMap />
          </div>
        </div>
      
      </div>

      {/* Footer CTA */}
      <ContactCTA />
    </div>
  );
};

export default ContactPage;