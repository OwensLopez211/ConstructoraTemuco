import Hero from "../components/home/Hero";
import Process from "../components/home/Process";
import ClientsBar from "../components/home/ClientsBar";
import PageTransition from "../components/animations/PageTransition";
import ServicesSection from "../components/home/ServicesSection";
import BeforeAfterSlider from "../components/home/BeforeAfterSlider";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollToId) {
      const element = document.getElementById(location.state.scrollToId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div>
      <PageTransition>
        <Hero />
        <ClientsBar />
        <ServicesSection />
        <Process />
        <BeforeAfterSlider />
      </PageTransition>
    </div>
  );
};

export default Home;