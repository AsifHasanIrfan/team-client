import Image from 'next/image';
import React from 'react';

const HeroRight = () => {
  return (
    <div className="__heroRightGsap translate-y-32 opacity-0 w-full lg:w-[510px] xl:w-[545px]">
      <Image
        src="/images/hero-right.svg"
        width={1}
        height={1}
        layout="responsive"
        alt="hero"
      />
    </div>
  );
};

export default HeroRight;
