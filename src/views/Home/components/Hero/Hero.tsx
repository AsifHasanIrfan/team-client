import React, { useEffect } from 'react';
import gsap from 'gsap';

import HeroLeft from './components/HeroLeft';
import HeroRight from './components/HeroRight';

const Hero: React.FC = () => {
  useEffect(() => {
    gsap.to('.__heroLeftGsap, .__heroRightGsap', {
      duration: 0.4,
      opacity: 1,
      y: 0,
    });
  }, []);

  return (
    <section className="bg-[#F7F8FA]">
      <div className="container lg:py-[130px] md:py-[60px] py-[40px]">
        <div className="flex items-center justify-between gap-[35px] flex-col-reverse lg:flex-row">
          <div className="pt-[50px]">
            <HeroLeft />
          </div>
          <div className="hidden md:block">
            <HeroRight />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
