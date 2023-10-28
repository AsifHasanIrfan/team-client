import gsap from 'gsap';
import React, { useEffect } from 'react';
import InclusiveCards from './components/InclusiveCards';
import InclusiveTitle from './components/InclusiveTitle';

const InclusiveEnvironment: React.FC = () => {
  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.__inclusiveEnvironmentSection',
        start: 'top 75%',
      },
    });

    tl.to('.__inclusiveCards', {
      duration: 0.4,
      opacity: 1,
      y: 0,
    });
  }, []);

  return (
    <section className="bg-[#F1F4FA]">
      <div className="container py-[60px]">
        <InclusiveTitle />
        <InclusiveCards />
      </div>
    </section>
  );
};

export default InclusiveEnvironment;
