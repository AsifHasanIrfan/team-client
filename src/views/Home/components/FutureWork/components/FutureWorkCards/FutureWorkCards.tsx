import gsap from 'gsap';
import React, { useEffect } from 'react';
import FutureWorkCard from '../FutureWorkCard/FutureWorkCard';

const FutureWorkCards: React.FC = () => {
  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.__futureSection',
        start: 'top 75%',
      },
    });
    tl.to('.__futureWorkCardGsap', {
      y: 0,
      opacity: 1,
      duration: 0.4,
    });
  }, []);
  return (
    <div className="grid __futureSection gap-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 mt-10">
      <FutureWorkCard
        img="/images/home/f-1.svg"
        title="Connected"
        description="We come together wherever we are across time zones, regions, offices and screens."
      />
      <FutureWorkCard
        img="/images/home/f-2.svg"
        title="Inclusive"
        description="Our teams reflect the rich diversity of our world, with equitable access to opportunity for everyone"
      />
      <FutureWorkCard
        img="/images/home/f-3.svg"
        title="Flexiable"
        description="We believe in your freedom to work when and how you work bes, to help us all thrive"
      />
    </div>
  );
};

export default FutureWorkCards;
