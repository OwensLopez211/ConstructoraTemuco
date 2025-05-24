import Hero from "../components/home/Hero";
import AboutUs from "../components/home/AboutUs";
import Services from "../components/home/Services";
import Process from "../components/home/Process";
import Testimonials from "../components/home/Testimonials";
import ClientsBar from "../components/home/ClientsBar";
import PageTransition from "../components/animations/PageTransition";

const Home = () => (
  <div>
    <PageTransition>
      <Hero />
      <ClientsBar />
      <AboutUs />
      <Services />
      <Process />
      <Testimonials />
    </PageTransition>
  </div>
);

export default Home;