import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLenis } from './hooks/useLenis';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { CustomCursor } from './components/CustomCursor';
import { Hero } from './components/Hero';
import { ArrivalSection } from './components/ArrivalSection';
import { PoolSection } from './components/PoolSection';
import { PropertyEntry } from './components/PropertyEntry';
import { LivingRoom } from './components/LivingRoom';
import { ArchitecturalDetails } from './components/ArchitecturalDetails';
import { Bedrooms } from './components/Bedrooms';
import { DiningSection } from './components/DiningSection';
import { Highlights } from './components/Highlights';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useLenis(true);

  useEffect(() => {
    // Refresh ScrollTrigger after fonts/images settle
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      clearTimeout(t);
      window.removeEventListener('load', onLoad);
    };
  }, []);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <ArrivalSection />
        <PoolSection />
        <PropertyEntry />
        <LivingRoom />
        <ArchitecturalDetails />
        <Bedrooms />
        <DiningSection />
        <Highlights />
        <Gallery />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
