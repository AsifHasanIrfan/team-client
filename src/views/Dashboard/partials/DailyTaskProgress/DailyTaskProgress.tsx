import React from 'react';

import { cx, taskData } from '@config/constants';
import { useAppSelector } from '@hooks/useRedux';

const DailyTaskProgress: React.FC = () => {
  const { tasks } = useAppSelector(state => state)

  const completeTask = tasks?.all_tasks?.filter((e: any) => e.status === 'Approved' || e.status === 'Approved Late');
  const progressbar = (completeTask?.length / tasks.all_tasks.length) * 100;

  return (
    <div
      className={cx(
        'min-w-max max-h-[33px] gap-[5px] flex flex-col items-center mr-5 md:mr-2'
      )}
    >
      <span className="w-full md:text-sm text-[10px] md:leading-5 font-semibold text-[#263238]">
        {completeTask?.length}/{tasks.all_tasks?.length} Task Completed
      </span>
      <span className="w-full h-2 relative overflow-hidden bg-[#F2F2F2] rounded-[42px] flex justify-start">
        <div
          className="absolute bg-primary h-full rounded-[42px]"
          style={{ width: progressbar + '%' }}
        ></div>
      </span>
    </div>
  );
};
export default DailyTaskProgress;
