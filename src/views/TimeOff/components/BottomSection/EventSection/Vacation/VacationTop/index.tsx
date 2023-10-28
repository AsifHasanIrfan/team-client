import { fireErrorModal } from '@hooks/helpers';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import TradeModal from '../TradeModal';
import PoliciesModal from './PoliciesModal';

const VacationTop = ({ vacationDays, userId, token, userFetch, user, availableMins }: any) => {

  const router = useRouter();

  // states
  const [modalOpen, setModalOpen] = useState(false);
  const [tradeModalOpen, setTradeModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between mt-[18px] mx-5">
        <div>
          <h3 className="text-[#1D1D1D] text-xl sm:text-2xl leading-[34px] font-medium">
            Vacation Polices
          </h3>

          <button
            type='button'
            className='text-primary hover:text-red leading-[21px] mt-[5px] sm:mt-[10px] outline-0 text-[16px] sm:text-[18px] font-medium'
            onClick={() => setModalOpen(!modalOpen)}
          >
            Time Off Policy
          </button>
        </div>

        <button
          type='button'
          className='text-[14px] font-medium  text-primary p-[15px] border border-primary rounded-[10px] hover:bg-primary hover:text-white transition ease-in-out duration-300 cursor-pointer'
          // disabled={(user?.workingAs === 'Intern' || user?.workingAs === 'Trial Member' || user?.isArchived)}
          onClick={() => router.push('/dashboard/benefits')}
        // onClick={() => {
        //   (user?.workingAs === 'Intern' || user?.workingAs === 'Trial Member' || user?.isArchived) ? fireErrorModal() : setTradeModalOpen(!tradeModalOpen)
        // }}
        >
          Trade Your Off Days
        </button>
      </div>

      <hr className="bg-[#CFCFCF] mt-5" />

      <PoliciesModal open={modalOpen} setOpen={setModalOpen} />

      <TradeModal
        open={tradeModalOpen}
        setOpen={setTradeModalOpen}
        vacationDays={vacationDays}
        availableMins={availableMins}
        userFetch={userFetch}
        userId={userId}
        token={token}
      />
    </>
  );
};
export default VacationTop;
