import gsap from 'gsap';
import React, { useEffect } from 'react';
import ClientSlider from './components/ClientSlider';
import ClientTitle from './components/ClientTitle';

const Index = () => {
  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.__clientsSection',
        start: 'top 90%',
      },
    });
    tl.to('.__clientSlider', { opacity: 1, y: 0, duration: 0.3 });
  }, []);

  return (
    <section className="bg-[#F7F8FA]">
      <div className="py-[80px] container">
        <ClientTitle />
        <ClientSlider />
      </div>
    </section>
  );
};

export default Index;
