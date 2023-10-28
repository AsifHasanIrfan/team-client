import Button from '@components/Button'
import { cx } from '@config/constants';
import React from 'react'
import { HiPlusSm } from 'react-icons/hi';

type Props = {
  setAssignModalOpen: any;
  setCreateModalOpen: any;
  filterTabValue: string;
  setFilterTabValue: (filterTabValue: string) => void;
  countPurchased: number;
};

const BenefitHeader = ({ setCreateModalOpen, setAssignModalOpen, filterTabValue, setFilterTabValue, countPurchased }: Props) => {

  console.log(countPurchased)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between">
      <div className="flex gap-[15px] py-4 px-1">
        <button
          type="button"
          onClick={() => setFilterTabValue('')}
          className={`lg:text-[22px] text-sm outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${!filterTabValue && '!text-darkHover '
            } }`}
        >
          Active Benefits
        </button>
        <button
          type="button"
          onClick={() => setFilterTabValue('archived')}
          className={`lg:text-[22px] text-sm outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${filterTabValue === 'archived' && ' !text-darkHover '
            } }`}
        >
          Archived Benefits
        </button>
        <button
          type="button"
          onClick={() => setFilterTabValue('assigned')}
          className={`lg:text-[22px] text-sm outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${
            filterTabValue === 'assigned' && ' !text-darkHover '
          } }`}
        >
          Assigned Benefits
        </button>
        <button
          type="button"
          onClick={() => setFilterTabValue('purchase')}
          className={`lg:text-[22px] text-sm outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${filterTabValue === 'purchase' && ' !text-darkHover '
            } }`}
        >
          Purchase History
          <span className={cx(
            'bg-primary text-white text-[14px] py-1 px-[7px] relative -top-[8px] rounded-full'
          )}>
            {countPurchased}
          </span>
        </button>
      </div>
      <div className="flex justify-end items-center gap-5">
        <Button
          onClick={() => setAssignModalOpen(true)}
          rounded="md"
          className="mb-4 inline text-sm w-full md:w-auto"
        >
          Assign <span className="hidden md:block">Benefit</span>
        </Button>
        <Button
          onClick={() => setCreateModalOpen(true)}
          rounded="md"
          className="mb-4 w-full md:w-auto"
        >
          Create <span className="hidden md:block">Benefit</span>
        </Button>
      </div>
    </div>
  );
}

export default BenefitHeader