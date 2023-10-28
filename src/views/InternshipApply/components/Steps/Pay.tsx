import React, { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import { useInternshipInfo } from '@hooks/useInternshipInfo';
import {
  HiOutlineArrowNarrowRight,
  HiOutlineArrowNarrowLeft,
} from 'react-icons/hi';

import Button from '@components/Button';
import { useInternshipApplyHandlers } from '@hooks/useInternshipApplyHandlers';
import StepCounter from '../StepCounter';

const Pay = () => {
  const [showError, setShowError] = useState(false);

  const { applicationData, updateApplicationData } = useInternshipInfo();
  const { handlePrev, handleNext } = useInternshipApplyHandlers();

  const [amount, setAmount] = useState(Number(applicationData.payGoal));

  function handleChange(e: any) {
    const result = e.target.value.replace(/\D/g, '');
    setAmount(result);
  }

  function handleIncrease() {
    if (amount < 10000) {
      setAmount(amount + 1);
    }
  }

  function handleDecrease() {
    if (amount > 0) {
      setAmount(amount - 1);
    }
  }

  useEffect(() => {
    updateApplicationData('payGoal', JSON.stringify(amount));
  }, [amount]);

  function onNext() {
    if (amount > 0) {
      handleNext();
    } else {
      setShowError(true);
    }
  }

  return (
    <>
      <StepCounter nextClick={() => onNext()} />

      <div className="w-full min-h-[75%] flex items-center justify-center lg:justify-start px-[60px] md:px-0 lg:pl-[60px]">
        <div className="my-[90px] lg:my-[0px]">
          <div>
            <h3 className="text-[16px] leading-[16px] font-[400] text-[#1D1D1D] mb-[15px] pl-[65px] md:pl-[95px]">
              Enter your monthly pay goal.
            </h3>

            <div className="flex gap-[15px] md:gap-[30px] items-center">
              <div
                className={`w-[50px] h-[50px] md:w-[65px] md:h-[65px] transition rounded-full border flex items-center justify-center ${
                  amount < 1
                    ? 'border-[#cfcfcf] text-[#cfcfcf]'
                    : 'border-[#1D1D1D] text-[#1D1D1D] hover:border-primary hover:text-primary'
                } cursor-pointer`}
                onClick={() => handleDecrease()}
              >
                <AiOutlineMinus fontSize="28px" />
              </div>

              <div className="relative">
                <div
                  className={`w-[230px] md:w-[350px] p-[17px] md:p-[20px] h-[56px] flex items-center gap-[5px] rounded-[8px] border ${
                    showError ? 'border-primary' : 'border-[#cfcfcf]'
                  }`}
                >
                  {amount > 0 && <span>$</span>}

                  <input
                    value={amount}
                    className={`bg-transparent outline-none text-[16px] m-0 p-0 w-full`}
                    placeholder="$0.00"
                    onChange={handleChange}
                  />
                </div>
                {showError && (
                  <small className="text-primary mt-[7px] block absolute right-0">
                    * Required Field
                  </small>
                )}
              </div>

              <div
                className="w-[50px] h-[50px] md:w-[65px] md:h-[65px] transition hover:border-primary hover:text-primary rounded-full border flex items-center justify-center border-[#1D1D1D] cursor-pointer"
                onClick={() => handleIncrease()}
              >
                <AiOutlinePlus fontSize="28px" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center 2xl:absolute justify-between border-t-2 border-[#F2F2F2] mt-[30px] lg:md-0 lg:absolute bottom-0 py-[20px] px-[60px]">
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

export default Pay;
