import React from 'react';
import CalendarComponent from './CalendarComponent';

const Calender: React.FC = () => {
  return (
    // lg:w-[449px] xl:w-[475px]
    <div className="flex flex-col timeoff-shadow bg-white rounded-[10px] lg:gap-[30px] gap-[20px]">
      <CalendarComponent />
    </div>
  );
};
export default Calender;
// w-full h-[415px] lg:h-[415px] lg:w-[450px] xl:w-[550px] 3xl:w-full
