import Button from '@components/Button';
import { InternshipModalProps } from '@config/types';
import Link from 'next/link';
import React from 'react';
import { BsArrowRight, BsExclamationCircle } from 'react-icons/bs';

function InternshipHeroSection({ setIsOpen }: InternshipModalProps) {
  return (
    <section className="xl:w-[686px] font-primary pt-20 pb-[60px]">
      <h1 className="font-semibold text-[30px] md:text-[33px] xl:text-[40px] leading-[125%] text-[#1D1D1D]">
        Summer analyst (Intern) Development Programs - NAELFY23
      </h1>

      <div className="pt-4 pb-7 md:pb-10 flex items-center">
        <Link href="/jobs">
          <a className="px-3 border-r border-[#454545] text-[#FF0032] hover:text-[#bc2745] leading-6 font-medium">
            + View All
          </a>
        </Link>
        <p className="px-3 leading-6 text-[#454545]">Job No: R0000054</p>
      </div>

      <div className="md:mt-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
        <Link href="internship/internshipApply">
          <Button className="w-fit md:w-auto" endIcon={<BsArrowRight />}>
            Apply Now
          </Button>
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="flex gap-1.5 items-center text-primary duration-100 hover:text-[#EA002E] font-medium leading-6"
        >
          <BsExclamationCircle />
          <span className="leading-none">Register for Job alerts</span>
        </button>
      </div>
    </section>
  );
}

export default InternshipHeroSection;
