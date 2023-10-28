import React from 'react';
import EmployeeOfTheMonthCard from '../EmployeeOfTheMonthCard';

type Props = {
  datas: any;
};

const CurrentEmployeeOfTheMonth = ({ datas }: Props) => {
  return (
    <div className="bg-white rounded-[20px] 3xl:p-5 p-5 tasksPage-shadow">
      <h4 className="text-[18px] xl:text-sm 3xl:text-[18px] leading-[21px] font-medium">
        Team Member of the Month
      </h4>

      <div className={`mt-5 space-y-[15px] ${datas?.length > 0 && 'h-[396px] overflow-y-auto scrolbar'}`}>
        {datas?.length > 0 ? (
          datas?.map((item: any, index: number) => (
            <EmployeeOfTheMonthCard data={item} index={index} key={index} />
          ))
        ) : (
          <p className="text-center text-red">No data available</p>
        )}
      </div>
    </div>
  );
};

export default CurrentEmployeeOfTheMonth;
