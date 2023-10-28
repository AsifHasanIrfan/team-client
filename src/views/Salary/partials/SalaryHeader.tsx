import { userManagementSortData } from '@config/constants';
import React, { useState } from 'react';

interface Props {
  openTab: number;
  setOpenTab: (openTab: number) => void;
}

const SalaryHeader = ({ openTab, setOpenTab }: Props) => {
  const [selectedOption, setSelectedOption] = useState(
    userManagementSortData[0]
  );

  return (
    <div className="flex justify-between items-center h-[60px] p-5 mb-[8px]">
      <div className="flex md:gap-[30px] sm:gap-[20px] gap-[5px] items-center">
        <button
          type="button"
          className={`md:text-[24px] text-[14px] outline-none font-medium ${openTab !== 0 && 'text-[#CCCCCC]'}`}
          onClick={() => setOpenTab(0)}
        >
          All
        </button>
        <button
          type="button"
          className={`md:text-[24px] text-[14px] outline-none font-medium ${openTab !== 1 && 'text-[#CCCCCC]'}`}
          onClick={() => setOpenTab(1)}
        >
          Paid
        </button>
        <button
          type="button"
          className={`md:text-[24px] text-[14px] outline-none font-medium ${openTab !== 2 && 'text-[#CCCCCC]'}`}
          onClick={() => setOpenTab(2)}
        >
          Processing
        </button>
        <button
          type="button"
          className={`md:text-[24px] text-[14px] outline-none font-medium ${openTab !== 3 && 'text-[#CCCCCC]'}`}
          onClick={() => setOpenTab(3)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SalaryHeader;
