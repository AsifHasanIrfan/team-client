import React from 'react';
import CheckIn from './CheckIn';
import DashboardBody from './DashboardBody';
import DashboardSocial from './DashboardSocial';
import { isMobile } from 'react-device-detect';

type Props = {
  token: any;
  userId: any;
  userFetch: any;
  isChecked: boolean;
}

const DashboardQuickLinks = ({ token, userId, isChecked, userFetch }: Props) => {
  return (
    <div className="rounded-[20px] bg-[#FFFFFF] tasksPage-shadow h-full">
      <div className='flex items-center justify-between px-5 py-[18px] lg:py-[20px] xl:py-[18px] cursor-default'>
        <h4 className="text-2xl font-medium">Quicklinks</h4>
        {!isMobile ? <CheckIn token={token} userId={userId} isChecked={isChecked} userFetch={userFetch} /> : null}
      </div>
      <hr />
      <div className="px-5 pb-[18px] mt-[20px] lg:mt-[30px] xl:mt-[20px]">
        <DashboardBody />
        <DashboardSocial />
      </div>
    </div>
  );
};
export default DashboardQuickLinks;
