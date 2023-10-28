import gsap from 'gsap';
import React, { useEffect } from 'react';
import CoreValuesLeft from './components/CoreValuesLeft';
import CoreValuesRight from './components/CoreValuesRight';

const OurCoreValues: React.FC = () => {
  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.__coreValuesSection',
        start: 'top 75%',
      },
    });

    tl.to('.__coreValuesRightGsap, .__coreValuesLeftGsap', {
      y: 0,
      duration: 0.4,
      opacity: 1,
    }).to('.__ourCoreValuesOptions', {
      y: 0,
      opacity: 1,
      stagger: {
        from: 'random',
      },
    });
  }, []);

  return (
    <section className="bg-[#F7F8FA]">
      <div className="container lg:py-[135px] md:py-[60px] py-[40px]">
        <div className="__coreValuesSection grid grid-col-1 gap-4 items-center md:grid-cols-2 ">
          <CoreValuesLeft />
          <CoreValuesRight />
        </div>
      </div>
    </section>
  );
};

export default OurCoreValues;
