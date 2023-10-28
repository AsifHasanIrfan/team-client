import Image from 'next/image';
import React, { useEffect } from 'react';
import { atom, useAtom } from 'jotai';

import {
  InterestedJob,
  LetStart,
  Address,
  Pay,
  PersonalInfo,
  PortfolioLink,
  Skills,
  Success,
} from './components/Steps';
import { applicationInfo } from '@state/index';

const Screens = [
  LetStart,
  InterestedJob,
  Skills,
  Pay,
  PortfolioLink,
  PersonalInfo,
  Address,
];

const sideText = [
  'What type of job do you want?',
  'Select your skills',
  'What your goal monthly pay?',
  'Add Your Portfolio Link',
  'Your personal information',
  'Where are you from?',
];

export const screenAtom = atom(1);
export const screenLength = atom(Screens.length);

function Apply() {
  const [activeScreen, setActiveScreen] = useAtom(screenAtom);
  const [finalData, setFinaldata] = useAtom(applicationInfo);

  const ActiveComponent = Screens[activeScreen - 1];

  if (activeScreen === 1) {
    return <LetStart />;
  }

  if (activeScreen === 8) {
    return <Success />;
  }

  return (
    <div className="sm:mt-[50px] bg-white md:mt-[85px] h-screen md:h-auto lg:mt-[100px] sm:min-h-[calc(100vh-50px)] md:min-h-[calc(100vh-85px)] lg:min-h-[calc(100vh-100px)]">
      <div className="lg:flex w-full sm:min-h-[calc(100vh-50px)] md:min-h-[calc(100vh-85px)] lg:min-h-[calc(100vh-100px)]">
        <div className="lg:w-[690px] h-[350px] lg:h-auto relative justify-center flex items-center bg-[#FF00320A]">
          <div className="lg:flex items-center gap-[18px] mt-[130px] lg:mt-[0px]">
            <div className="w-[74px] h-[74px] mx-auto">
              <Image
                src="/images/apply/avatar.png"
                width={1}
                height={1}
                layout="responsive"
                alt="avatar"
              />
            </div>

            <h3 className="text-[#1D1D1D] text-[24px] leading-[33px] font-[600] text-center lg:text-start w-[350px] mt-[20px] lg:mt-[0px]">
              {sideText[activeScreen - 2]}
            </h3>
          </div>
        </div>

        <div className="relative flex-auto mt-[30px] lg:mt-[0px] bg-white">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}

export default Apply;
