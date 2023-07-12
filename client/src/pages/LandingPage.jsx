import BestChoice from '../components/BestChoice';
import Favorite from '../components/Favorite';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';

function LandingPage() {
  return (
    <div className="bg-brand-100">
      <Header />
      <Hero />
      <Services />
      <Favorite />
      <BestChoice />
      <Footer />
    </div>
  );
}

export default LandingPage;
