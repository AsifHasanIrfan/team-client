import Image from 'next/image';
import React from 'react';
import { atom, useAtom } from 'jotai';
import { BiRightArrowAlt } from 'react-icons/bi';

import StepCounter from '../StepCounter';
import Button from '@components/Button';
import { screenAtom } from '@views/Apply/Apply';
import { useApplicationInfo } from '@hooks/useApplicationInfo';
import { useApplyHandlers } from '@hooks/useApplyHandlers';

let items = [
  "I'm looking for a job right now",
  "I'm looking for a job for the future",
  'Add link to affliate program',
];

export const roleAtom = atom(0);

const LetStart: React.FC = () => {
  const [role, setRole] = useAtom(roleAtom);
  const [activeScreen, setActiveScreen] = useAtom(screenAtom);
  const { updateApplicationData } = useApplicationInfo();
  const { handleNext } = useApplyHandlers();

  function handleStart() {
    updateApplicationData('lookingFor', items[role]);
    setActiveScreen(2);
  }

  return (
    <div className="relative min-h-screen bg-white sm:mt-[50px] md:mt-[85px] lg:mt-[100px] sm:min-h-[calc(100vh-50px)] md:min-h-[calc(100vh-85px)] lg:min-h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="absolute z-10 top-[30px] lg:top-[41px] left-[60px] lg:left-[120px]">
        <StepCounter nextClick={() => handleNext()} />
      </div>

      <div className="w-[305px] mt-[150px] md:mt-[initial]">
        <div className="w-[100px] h-[100px] mx-auto">
          <Image
            src="/images/apply/avatar.png"
            width={1}
            height={1}
            layout="responsive"
            alt="apply"
          />
        </div>

        <h3 className="text-[23px] text-center leading-[33px] font-[600] text-[#1D1D1D] mt-[16px] mb-[40px] xl:mb-[50px]">
          <p>Welcome!</p>
          <p className="w-full">What brings you here today?</p>
        </h3>

        {items.map((e, i) => (
          <div
            key={i}
            onClick={() => setRole(i)}
            className={`
                            py-[15px] px-[24px] hover:border-red rounded-[40px] mb-[18px] w-full border-[2px] border-[#949494] text-center cursor-pointer text-[16px] leading-[22px] font-[400] group
                            ${role === i
                ? '!text-primary !bg-[#FF00321A] !border-primary'
                : ''
              }
                        `}
          >
            <span className='group-hover:text-primary'>{e}</span>
          </div>
        ))}

        <Button
          endIcon={<BiRightArrowAlt />}
          onClick={handleStart}
          className={`w-full mt-[40px] ${!role && 'd-none'}`}
        >
          {' '}
          Lets start{' '}
        </Button>
      </div>
    </div>
  );
};

export default LetStart;
