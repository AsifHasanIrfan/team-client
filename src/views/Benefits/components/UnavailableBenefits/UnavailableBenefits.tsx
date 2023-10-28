import Image from 'next/image';
import React from 'react';

type Props = {
  userUpComingBenefits: any;
};

const UnavailableBenefits = ({ userUpComingBenefits }: Props) => {
  return (
    <>
      <div>
        {userUpComingBenefits <= 0 && (
          <h2 className="mt-5 text-xl text-red text-center">
            {' '}
            You have no unavailable benefits!
          </h2>
        )}
        {userUpComingBenefits.map((benefit: any, i: any) => (
          <div
            key={i}
            className="my-5 flex items-center md:gap-8 lg:gap-[75px] xl:gap-[30px] 2xl:gap-5 justify-between bg-white rounded-[15px] border-l-[5px] lg:border-l-[10px] xl:border-l-[7px] 2xl:border-l-[10px] border-primary p-2.5 lg:p-8 xl:p-5 2xl:px-10 2xl:py-[30px]"
          >
            <div className="flex items-center gap-2.5 md:gap-4 2xl:gap-6">
              <div className="shrink-0 w-[60px] h-full md:w-[70px] lg:w-[120px] xl:w-[150px] relative">
                <Image
                  src={benefit?.imgUrl}
                  alt="benefit_image"
                  height={100}
                  width={100}
                  objectFit="cover"
                />
              </div>
              <div>
                <h3 className="text-sm md:text-base lg:text-[26px] 2xl:text-3xl font-semibold text-[#1D1D1D]">
                  {benefit?.title}
                </h3>
                <p className="text-[10px] lg:text-lg xl:text-sm 2xl:text-xs font-normal text-[#8B979F] mt-1.5">
                  {benefit?.subDescription ? benefit?.subDescription : 'I am DG benefit with no description.'}
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-normal md:font-medium w-max text-xs md:text-sm text-[#8B979F]">
                Currently Unavailable
              </span>
              <span className="font-normal md:font-medium w-max text-xs md:text-sm text-[#8B979F]">
                Contact Rasel for Details
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UnavailableBenefits;
