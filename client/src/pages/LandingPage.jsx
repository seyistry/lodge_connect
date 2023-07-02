import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';

function LandingPage() {
  return (
    <div className="bg-brand-100">
      <Header />
      <Hero />
      <Services />
    </div>
  );
}

export default LandingPage;
