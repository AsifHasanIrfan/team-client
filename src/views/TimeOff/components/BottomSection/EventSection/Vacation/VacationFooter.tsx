import { fireErrorModal } from '@hooks/helpers';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import PurchaseOffDayModal from './PurchaseOffDayModal';

type Props = {
  userId: any,
  token: any,
  userFetch: any,
  availableDGCoin: number,
  user: any
}

const VacationFooter = ({ userId, token, userFetch, availableDGCoin, user }: Props) => {

  const router = useRouter();

  // states
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="pb-4 2xl:pb-3">
        <hr className="bg-[#CFCFCF] " />
        <div className="flex flex-col items-center justify-center w-full mt-4 pb-2 cursor-default">
          <div className="">

            <h4 className="text-center text-[#263238] leading-[22px] font-normal text-base tracking-tight">
              Accrue 2 days per six weeks ( 10 days/ year)
            </h4>

            <h4
              // onClick={() => {
              //   (user?.workingAs === 'Intern' || user?.workingAs === 'Trial Member' || user?.isArchived) ? fireErrorModal() : setOpen(true)
              // }}
              onClick={() => router.push('/dashboard/benefits')}
              className="text-center text-primary leading-[19px] font-normal text-base mt-2 underline cursor-pointer decoration-primary hover:text-red transition ease-in-out duration-300"
            >
              Purchase More Paid Off Days
            </h4>

          </div>

          <PurchaseOffDayModal
            open={open}
            setOpen={setOpen}
            userId={userId}
            token={token}
            userFetch={userFetch}
            availableDGCoin={availableDGCoin}
          />
        </div>
      </div>
    </>
  );
};

export default VacationFooter;
