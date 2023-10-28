import Image from 'next/image';
import React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const CoreValuesLeftBottom: React.FC = () => {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="md:mt-[60px] mt-[30px] md:w-[45%] lg:w-[75%] w-full">
        <div className="grid grid-cols-2 justify-between items-center mb-[29px]">
          <div className="__ourCoreValuesOptions translate-y-20 opacity-0 flex items-center md:gap-x-[10px] gap-x-[16px]">
            <BsFillCheckCircleFill className="text-primary text-2xl" />
            <span className="lg:text-base md:text-sm text-base font-medium">
              Empathy
            </span>
          </div>
          <div className="__ourCoreValuesOptions translate-y-20 opacity-0 flex items-center md:gap-x-[10px] gap-x-[16px]">
            <BsFillCheckCircleFill className="text-primary text-2xl" />
            <span className="lg:text-base md:text-sm text-base font-medium">
              Craftsmanship
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 justify-between items-center mb-[29px]">
          <div className="__ourCoreValuesOptions translate-y-20 opacity-0 flex items-center md:gap-x-[10px] gap-x-[16px]">
            <BsFillCheckCircleFill className="text-primary text-2xl" />
            <span className="lg:text-base md:text-sm text-base font-medium">
              Courtesy
            </span>
          </div>
          <div className="__ourCoreValuesOptions translate-y-20 opacity-0 flex items-center md:gap-x-[10px] gap-x-[16px]">
            <BsFillCheckCircleFill className="text-primary text-2xl" />
            <span className="lg:text-base md:text-sm text-base font-medium">
              Playfulness
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 justify-between items-center mb-[29px]">
          <div className="__ourCoreValuesOptions translate-y-20 opacity-0 flex items-center md:gap-x-[10px] gap-x-[16px]">
            <BsFillCheckCircleFill className="text-primary text-2xl" />
            <span className="lg:text-base md:text-sm text-base font-medium">
              Thriving
            </span>
          </div>
          <div className="__ourCoreValuesOptions translate-y-20 opacity-0 flex items-center md:gap-x-[10px] gap-x-[16px]">
            <BsFillCheckCircleFill className="text-primary text-2xl" />
            <span className="lg:text-base md:text-sm text-base font-medium">
              Solidarity
            </span>
          </div>
        </div>
      </div>

      <div className="lg:hidden md:block hidden">
        <Image
          src="/images/core-values.png"
          width={275}
          height={180}
          alt="core value"
        />
      </div>
    </div>
  );
};

export default CoreValuesLeftBottom;
