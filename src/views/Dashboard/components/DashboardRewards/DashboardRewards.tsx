import MyRewardItem from '@views/Rewards/partials/MyRewardItem';
import React from 'react';
import CardHeader from '../../partials/CardHeader';
import RewardTableHeader from './RewardTableHeader';

const DashboardRewards: React.FC<any> = ({ datas }) => {
  return (
    <div className="bg-white rounded-[20px] pb-[30px] w-full">
      <CardHeader title="My Rewards" link="dashboard/rewards" />

      <hr className="block md:hidden" />

      <RewardTableHeader />

      <div className="max-h-[250px] overflow-y-auto scrolbar">
        {datas?.map((item: any, index: any) => (
          <MyRewardItem
            key={index}
            data={item}
            index={index}
            last={datas.length - 1 === index}
          />
        ))}
        {!datas?.length && (
          <div className="flex items-center justify-center w-full p-3.5">
            No records to display!
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardRewards;
