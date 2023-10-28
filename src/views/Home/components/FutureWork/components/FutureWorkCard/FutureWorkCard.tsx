import Image from 'next/image';
import React from 'react';
import { FutureWorkDataType } from '@config/types';

const FutureWorkCard = ({ img, title, description }: FutureWorkDataType) => {
  return (
    <div className="__futureWorkCardGsap translate-y-40 opacity-0 bg-white lg:px-[32px] md:px-[10px] px-[40px] pt-[43px] pb-[50px] rounded-lg text-center">
      <Image src={img} width={60} height={60} alt={title} />
      <h2 className="lg:text-xl text-lg font-semibold my-4">{title}</h2>
      <div className="flex justify-center">
        <div className="w-9/12">
          <p className="lg:text-base text-sm text-center">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default FutureWorkCard;
