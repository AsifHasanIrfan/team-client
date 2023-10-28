import React from 'react';
import SalaryInfoCard from '@views/Salary/partials/SalaryInfoCard';

type SalaryInfoProps = {
  data: any;
  loading: any;
};

const PreviousMonthSalaryInfo: React.FC<SalaryInfoProps> = ({ data, loading }) => {
  return (
    <div className="currency_converter h-fit w-full lg:w-[50%] xl:w-[260px] 2xl:w-[540px] timeoff-shadow">
      <div className="py-[13px] pl-[20px] bg-[#263238] rounded-t-[10px]">
        <p className="text-[16px] text-white font-[500] leading-[22px]">
          Previous month salary
        </p>
      </div>
      <div className="px-5 py-5 bg-white rounded-b-[10px] flex flex-col gap-5">
        <SalaryInfoCard
          title="Your last month total salary"
          value={data?.totalPreviousMonthSalary}
          totalSalary
          loading={loading}
        />
      </div>
    </div>
  );
};

export default PreviousMonthSalaryInfo;
