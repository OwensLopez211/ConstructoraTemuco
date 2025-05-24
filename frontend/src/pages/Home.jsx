import Hero from "../components/home/Hero";
import AboutUs from "../components/home/AboutUs";
import Services from "../components/home/Services";
import Process from "../components/home/Process";
import Testimonials from "../components/home/Testimonials";
import ClientsBar from "../components/home/ClientsBar";

const Home = () => (
  <div>
    <Hero />
    <ClientsBar />
    <AboutUs />
    <Services />
    <Process />
    <Testimonials />
  </div>
);

export default Home;