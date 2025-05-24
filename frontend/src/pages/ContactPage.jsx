import ContactHeader from "../components/contact/ContactHeader";
import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import ContactMap from "../components/contact/ContactMap";
import PageTransition from "../components/animations/PageTransition";

const ContactPage = () => (
  <section className="py-12 px-4 sm:py-24 sm:px-6 bg-white min-h-screen">
    <PageTransition>    
    <ContactHeader />
    <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
      <ContactForm />
      <div>
        <ContactInfo />
        <ContactMap />
      </div>
    </div>
    </PageTransition>
  </section>
);

export default ContactPage;