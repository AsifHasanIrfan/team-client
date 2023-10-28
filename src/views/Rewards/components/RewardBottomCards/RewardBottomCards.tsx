import DailyTokenCard from '@views/Rewards/partials/DailyTokenCard';
import MyRewardCard from '@views/Rewards/partials/MyRewardCard';
import React from 'react';

const RewardBottomCards: React.FC<any> = ({ datas }) => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-[30px] gap-[20px] mt-[30px]">
      <MyRewardCard datas={datas} />
      <DailyTokenCard />
    </div>
  );
};

export default RewardBottomCards;
