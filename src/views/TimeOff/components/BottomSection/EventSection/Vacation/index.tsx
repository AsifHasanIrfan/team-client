import React from 'react';
import VacationTop from './VacationTop';
import VacationFooter from './VacationFooter';
import VacationCardAvailable from './VacationBody/VacationCardAvailable';

type Props = {
  user: any,
  token: any,
  userFetch: any
}

const Vacation = ({ user, token, userFetch }: Props) => {
  return (
    <div className="flex flex-col w-full h-max timeoff-shadow bg-white rounded-[10px]">

      <VacationTop
        user={user}
        userId={user?._id}
        token={token}
        userFetch={userFetch}
        vacationDays={user?.availableTimeOff?.vacationDays}
        availableMins={user?.timeOffInMins?.totalMinsAvailable}
      />

      <div className="flex flex-col md:flex-row gap-4 px-5 md:px-0 items-center justify-around w-full my-[32px]">
        <VacationCardAvailable
          availableMins={user?.timeOffInMins?.totalMinsAvailable ? user?.timeOffInMins?.totalMinsAvailable : 0}
          title={'Available'}
          available={true}
        />
        <VacationCardAvailable
          takenMins={user?.timeOffInMins?.totalMinsTaken ? user?.timeOffInMins?.totalMinsTaken : 0}
          title={'Taken'}
        />
      </div>

      <hr />

      <VacationFooter
        userId={user?._id}
        availableDGCoin={user?.dgCoin}
        token={token}
        userFetch={userFetch}
        user={user}
      />
    </div>
  );
};
export default Vacation;

