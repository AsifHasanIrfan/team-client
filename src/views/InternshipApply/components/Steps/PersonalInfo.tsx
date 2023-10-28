import React, { useState } from 'react';
import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from 'react-icons/hi';

import Button from '@components/Button';
import { useInternshipApplyHandlers } from '@hooks/useInternshipApplyHandlers';
import { useInternshipInfo } from '@hooks/useInternshipInfo';
import StepCounter from '../StepCounter';

const PersonalInfo = () => {
  const [emailError, setEmailError] = useState(false);

  const [phoneErr, setPhoneErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [nameErr, setNameErr] = useState(false);

  const { applicationData, updateApplicationData } = useInternshipInfo();
  const { handlePrev, handleNext } = useInternshipApplyHandlers();

  const { phone, fullname, email } = applicationData;

  function isValidEmail(email: any) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function handleChange({ target }: any) {
    if (target.name === 'phone') {
      const result = target.value.replace(/\D/g, '');
      target.value = result;

      if (phone) setPhoneErr(false);
    }

    if (target.name === 'email') {
      if (!isValidEmail(target.value)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }

      if (email) setEmailErr(false);
    }

    if (target.name === 'fullname' && fullname) setNameErr(false);

    updateApplicationData(target.name, target.value);
  }

  function onNext() {
    if (fullname && email && phone) {
      handleNext();
    }

    if (!email && !emailError) setEmailErr(true);
    if (!phone) setPhoneErr(true);
    if (!fullname) setNameErr(true);
  }

  return (
    <>
      <StepCounter nextClick={() => onNext()} />

      <div className="w-full min-h-[75%] flex items-center justify-center lg:justify-start px-[60px] md:px-0 lg:pl-[60px]">
        <div>
          <div className="mb-[25px]">
            <h3 className="text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]">
              Your Full Name
            </h3>

            <input
              name="fullname"
              className={`w-[360px] md:w-[540px] h-[56px] p-[20px] bg-transparent outline-none text-[16px] rounded-[8px] border ${
                nameErr ? 'border-primary' : 'border-[#cfcfcf]'
              }`}
              placeholder="Gregg"
              onChange={handleChange}
              value={fullname}
            />
            {nameErr && (
              <small className="text-primary mt-[7px] block text-end">
                * Required Field
              </small>
            )}
          </div>

          <div className="mb-[25px]">
            <h3 className="text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]">
              Your Email Address
            </h3>

            <input
              name="email"
              className={`w-[360px] md:w-[540px] h-[56px] p-[20px] bg-transparent outline-none text-[16px] rounded-[8px] border ${
                emailError || emailErr ? 'border-primary' : 'border-[#cfcfcf]'
              }`}
              placeholder="digitalgregg@gmail.com"
              type="email"
              onChange={handleChange}
              value={email}
              required
            />
            <small className="block text-primary text-end mt-[7px]">
              {(emailError && 'Email is invalid') ||
                (emailErr && '* Required Field')}
            </small>
          </div>

          <div>
            <h3 className="text-[16px] leading-[22px] font-[500] text-[#1D1D1D] mb-[10px]">
              Your Phone Number
            </h3>

            <input
              name="phone"
              className={`w-[360px] md:w-[540px] h-[56px] p-[20px] bg-transparent outline-none text-[16px] rounded-[8px] border ${
                phoneErr ? 'border-primary' : 'border-[#cfcfcf]'
              }`}
              placeholder="(+123) 456 789 88"
              onChange={handleChange}
              value={phone}
            />
            {phoneErr && (
              <small className="text-primary mt-[7px] block text-end">
                * Required Field
              </small>
            )}
          </div>
        </div>
      </div>

      <div className="w-full flex 2xl:absolute items-center justify-between border-t-2 border-[#F2F2F2] mt-[30px] lg:md-0 bottom-0 py-[20px] px-[60px]">
        <Button
          startIcon={<HiOutlineArrowNarrowLeft />}
          onClick={() => handlePrev()}
          className="text-black hover:text-primary bg-transparent !pl-[0px] !shadow-none hover:bg-transparent"
        >
          {' '}
          Back{' '}
        </Button>
        <Button
          endIcon={<HiOutlineArrowNarrowRight />}
          onClick={() => onNext()}
        >
          {' '}
          Next{' '}
        </Button>
      </div>
    </>
  );
};

export default PersonalInfo;
