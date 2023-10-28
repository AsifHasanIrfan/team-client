import React from 'react';
import { useAtom } from 'jotai';

import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from 'react-icons/hi';
import { screenAtom } from '../InternshipApply';
import { useInternshipApplyHandlers } from '@hooks/useInternshipApplyHandlers';
import { StepCounterProps } from '@config/types';

const StepCounter: React.FC<StepCounterProps> = ({ nextClick }) => {
  const [activeScreen, setActiveScreen] = useAtom(screenAtom);
  const { handlePrev } = useInternshipApplyHandlers();

  return (
    <div className="bg-[#fff6f8] md:bg-transparent fixed flex justify-center w-full md:inline top-[60px] left-1/2 py-[11px] md:py-[0] -translate-x-1/2 md:translate-x-0 lg:top-[130px] md:left-[60px] lg:left-[120px] z-10 md:my-7 lg:my-0">
      <div className="flex items-center gap-[16px] text-[20px] step-counter">
        <HiOutlineArrowNarrowLeft
          color="#C10206"
          fontSize="31px"
          cursor="pointer"
          onClick={() => handlePrev()}
        />

        <div className="flex items-center gap-[16px]">
          <p className="text-[20px] leading-[28px] font-[400] w-[36px] h-[36px] justify-center text-primary bg-[#FF00321A] flex items-center rounded-full">
            {' '}
            {activeScreen}{' '}
          </p>
          <span className="text-[#1D1D1D]">of 6</span>
        </div>

        <HiOutlineArrowNarrowRight
          color="#C10206"
          fontSize="31px"
          cursor="pointer"
          onClick={nextClick}
        />
      </div>
    </div>
  );
};

export default StepCounter;
