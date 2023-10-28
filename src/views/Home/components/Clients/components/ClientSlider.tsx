import { clientSildeData } from '@config/constants';
import Image from 'next/image';
import React from 'react';
import Marquee from 'react-fast-marquee';

const ClientSlider: React.FC = () => {
  return (
    <div className="mt-[40px] __clientSlider __clientsSection opacity-0 translate-y-16">
      <Marquee gradient={false} speed={50}>
        {/* <div className='grid grid-cols-4'> */}
        {clientSildeData.map((item, index) => (
          <div className="lg:m-[0_60px] md:m-[0_45px] m-[0_30px]" key={index}>
            <Image src={item.imgSrc} width={145} height={35} alt="sliderimg" />
          </div>
        ))}
        {/* </div> */}
      </Marquee>
    </div>
  );
};

export default ClientSlider;
