import React from 'react';
// internal imports
import SalaryInfoCard from '@views/Salary/partials/SalaryInfoCard';

type SalaryInfoProps = {
  data: any;
  loading: any;
};

const SalaryInfo: React.FC<SalaryInfoProps> = ({ data, loading }) => {
  return (
    <div className="currency_converter w-full lg:w-[50%] xl:w-[260px] 2xl:w-[540px] timeoff-shadow">
      <div className="py-[13px] pl-[20px] bg-[#263238] rounded-t-[10px]">
        <p className="text-[16px] text-white font-[500] leading-[22px]">
          This month salary
        </p>
      </div>
      <div className="px-5 py-5 bg-white rounded-b-[10px] flex flex-col gap-5">
        <SalaryInfoCard
          title="This Month Salary"
          value={data?.totalThisMonthSalary}
          salary
          loading={loading}
        />
        <SalaryInfoCard
          title="This Month Rewards"
          value={data?.totalThisMonthAchievementRewards}
          rewards
          loading={loading}
        />
        <SalaryInfoCard
          title="This Month Drawbacks"
          value={data?.totalThisMonthDrawbacks}
          drawback
          loading={loading}
        />
        <SalaryInfoCard
          title="This Month DG Coin"
          value={data?.totalThisMonthRewards}
          dgCoin
          loading={loading}
        />
      </div>
    </div>
  );
};
export default SalaryInfo;
