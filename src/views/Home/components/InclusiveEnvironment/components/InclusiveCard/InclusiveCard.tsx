import Image from 'next/image';
import React from 'react';
import { InclusiveDataType } from '@config/types';

const InclusiveCard = ({ img, title, description }: InclusiveDataType) => {
  return (
    <div className="__inclusiveCards translate-y-20 opacity-0 bg-white p-[30px] rounded-lg text-center">
      <div className="flex gap-4 items-center">
        <Image src={img} width={30} height={30} alt={title} />
        <h2 className="md:text-lg text-sm font-medium">{title}</h2>
      </div>

      <p className="lg:text-base text-sm text-left mt-5">{description}</p>
    </div>
  );
};

export default InclusiveCard;
