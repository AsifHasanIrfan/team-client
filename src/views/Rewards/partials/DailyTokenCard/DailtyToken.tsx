import { dailyTokenData } from '@config/constants';
import React from 'react';
import DailyTokenItem from '../DailyTokenItem';

const DailtyToken: React.FC = () => {
  return (
    <div className="bg-white rounded-[20px] pb-[30px] w-full timeoff-shadow relative h-fit">
      <div className="bg-white opacity-[0.08]">
        <h4 className="font-2xl font-medium py-[18px] md:pl-[20px] pl-[12px]">
          Daily coin collect
        </h4>
        <hr className="block md:hidden" />

        {dailyTokenData.map((item, index) => (
          <DailyTokenItem key={index} data={item} />
        ))}
      </div>
      <div className="absolute inset-0 flex justify-center items-center text-center !z-10">
        <div className="font-[600] text-[30px]">
          <h3 className="text-primary">Coming Soon...</h3>
        </div>
      </div>
    </div>
  );
};

export default DailtyToken;
