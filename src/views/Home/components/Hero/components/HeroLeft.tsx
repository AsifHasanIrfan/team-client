import { AiOutlineArrowRight } from 'react-icons/ai';
import React, { useEffect } from 'react';
import Link from 'next/link';
import anime from 'animejs/lib/anime';

const targets = [
  {
    target: '._employeeCount',
    count: 50,
  },
  {
    target: '._memberCount',
    count: 40,
  },
  {
    target: '._runningProject',
    count: 9,
  },
  {
    target: '._completedProject',
    count: 30,
  },
];

const HeroLeft: React.FC = () => {
  useEffect(() => {
    targets.map(({ count, target }) => {
      anime({
        targets: target,
        innerHTML: [0, count],
        easing: 'linear',
        round: 10, // Will round the animated value to 1 decimal
      });
    });
  }, []);

  return (
    <div className="__heroLeftGsap translate-y-32 opacity-0 w-full lg:w-[515px] xl:w-[560px]">
      <h3 className="uppercase font-[600] text-[#263238] md:text-[16px] text-[14px] leading-[20px] mb-[15px]">
        CAREERS AT DIGITAL GREEG
      </h3>
      <div className="flex gap-[10px] font-[600] md:text-[40px] text-[30px] leading-[50px] mb-[15px]">
        {' '}
        <h1 className="text-primary">Work</h1> <h1>with us.</h1>{' '}
      </div>
      <p className="md:text-[16px] text-[14px] text-[#1D1D1D] leading-[23px] font-[300]">
        {`We're looking for amazing people to join our powerhouse team. We take pride in our work and we recognize that our team members are our lifeblood. Digital Gregg's team is what defines our culture and allow us to grow and thrive.`}{' '}
      </p>

      <div className="mt-[40px] lg:mt-[50px] mb-[30px] md:mb-[40px] lg:mb-[60px] gap-[20px] md:gap-[30px] flex-col md:flex-row flex items-center">
        <Link href="/jobs" passHref>
          <button className="border-none flex items-center gap-[10px] py-[15px] px-[45px] bg-primary hover:bg-[#EA002E] rounded-full text-[18px] font-[500] text-white">
            Apply Now <AiOutlineArrowRight />
          </button>
        </Link>

        <Link href="/internship" passHref>
          <p className="text-primary text-[16px] cursor-pointer leading-[22px] underline font-[500] hover:text-red">
            Looking for internship?
          </p>
        </Link>
      </div>

      <div className="py-[18px] md:py-[40px] px-[15px] md:px-[25px] bg-[#FFFFFF] rounded-[15px] w-full md:w-fit lg:w-[515px] xl:w-[560px] flex">
        <div className="text-center w-[60px] md:w-[105px]">
          <h2 className="text-[16px] md:text-[24px] leading-[20px] md:leading-[30px] font-[600] text-primary">
            <span className="_employeeCount">50</span>+
          </h2>
          <p className="text-[12px] leading-[15px] font-[400] font-[#1D1D1D] mt-[10px] md:mt-[15px]">
            Employee
          </p>
        </div>

        <div className="h-[55px] w-[2px] bg-[#0000001A] mx-[15px] lg:mx-[7.5px] xl:mx-[15px]" />

        <div className="text-center w-[60px] md:w-[105px]">
          <h2 className="text-[16px] md:text-[24px] leading-[20px] md:leading-[30px] font-[600] text-primary">
            <span className="_memberCount">40</span>+
          </h2>
          <p className="text-[12px] leading-[15px] font-[400] font-[#1D1D1D] mt-[10px] md:mt-[15px]">
            Member
          </p>
        </div>

        <div className="h-[55px] w-[2px] bg-[#0000001A] mx-[15px] lg:mx-[7.5px] xl:mx-[15px]" />

        <div className="text-center w-[60px] md:w-[105px]">
          <h2 className="text-[16px] md:text-[24px] leading-[20px] md:leading-[30px] font-[600] text-primary">
            <span className="_runningProject"> 9</span>
          </h2>
          <p className="text-[12px] leading-[15px] font-[400] font-[#1D1D1D] mt-[10px] md:mt-[15px]">
            Running project
          </p>
        </div>

        <div className="h-[55px] w-[2px] bg-[#0000001A] mx-[15px] lg:mx-[7.5px] xl:mx-[15px]" />

        <div className="text-center w-[60px] md:w-[105px]">
          <h2 className="text-[16px] md:text-[24px] leading-[20px] md:leading-[30px] font-[600] text-primary">
            <span className="_completedProject">30</span>+
          </h2>
          <p className="text-[12px] leading-[15px] font-[400] font-[#1D1D1D] mt-[10px] md:mt-[15px]">
            Completed Project
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroLeft;
