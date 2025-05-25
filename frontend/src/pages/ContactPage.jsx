import ContactHero from "../components/contact/ContactHero";
import ContactCards from "../components/contact/ContactCards";
import ContactForm from "../components/contact/ContactForm";
import ContactWhyChoose from "../components/contact/ContactWhyChoose";
import ContactMap from "../components/contact/ContactMap";
import ContactCTA from "../components/contact/ContactCTA";

const ContactPage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10"></div>
        <div className="relative w-full px-2 sm:px-4 lg:px-6 py-8 lg:py-12">
          <ContactHero />
          <div className="w-full px-2 lg:px-6 xl:px-10 mb-2">
            <ContactCards />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6 items-stretch w-full max-w-none px-2 lg:px-6 xl:px-10">
            
            {/* Left Side - Contact Form */}
            <ContactForm />

            {/* Right Side - Additional Info */}
            <div className="space-y-5">
              <ContactWhyChoose />
              <ContactMap />
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <ContactCTA />
    </div>
  );
};

export default ContactPage;