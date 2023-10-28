import Calendar from '@components/Calendar';
import React from 'react';

const CalendarComponent = () => {

  return (
    <div className="w-full lg:w-[50%] xl:w-[455px] bg-white rounded-[10px] p-[20px] timeoff-shadow">
      <div className="flex items-center justify-between mb-[20px]">
        <h4 className="text-[24px] font-[500]">Calendar</h4>

        {/* <button
          type="button"
          className="text-primary hover:text-red"
          onClick={handleReset}
        >
          Today
        </button> */}
      </div>

      <Calendar />
    </div>
  );
};

export default CalendarComponent;
