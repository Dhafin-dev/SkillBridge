import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { LandingHero } from './LandingHero';
import { About } from './About';
import { HelpCenter } from './HelpCenter';

export const PublicHome: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // If there's a hash in the URL (e.g., #about), scroll to it on load
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="flex flex-col w-full">
      <section id="landing" className="scroll-mt-20">
        <LandingHero />
      </section>
      
      <section id="about" className="scroll-mt-20">
        <About />
      </section>
      
      <section id="help" className="scroll-mt-20">
        <HelpCenter />
      </section>

      {/* Footer Branding Notice */}
      <footer className="py-8 text-center text-xs text-slate-400 font-medium bg-[#f8f9ff]">
        <p>© 2026 SkillBridge. Bridging Academia & Enterprise.</p>
      </footer>
    </div>
  );
};
