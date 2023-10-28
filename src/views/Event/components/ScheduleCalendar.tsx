import React from 'react';
import Extra from './Extra';

const ScheduleCalendar = () => {
  return (
    <div className="w-full h-[90vh] bg-[#fff] rounded-[10px] p-[20px] relative">
      <div className='bg-white opacity-[0.08]'>
        <Extra />
      </div>
      <div className="absolute inset-0 flex justify-center items-center text-center !z-10">
        <div className="font-[600] text-[30px]">
          <h3 className="text-primary">Coming Soon...</h3>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalendar;
