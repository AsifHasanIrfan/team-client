import React from 'react';

import { cx } from '@config/constants';
import { useAppSelector } from '@hooks/useRedux';

const TaskProgress: React.FC = () => {
  const { tasks } = useAppSelector(state => state)

  const completeTask = tasks?.all_tasks?.filter((e: any) => e.status === 'Approved' || e.status === 'Approved Late')
  const progressbar = (completeTask?.length / tasks?.all_tasks?.length) * 100;

  return (
    <div className={cx('w-full sm:min-w-[150px] md:max-h-[33px] max-h-[50px] gap-[5px] flex flex-col pb-4 md:pb-0')}>
      <span className="w-full text-sm leading-5 font-semibold text-[#263238]">
        {completeTask?.length}/{tasks?.all_tasks?.length} Task Completed 
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
export default TaskProgress;
