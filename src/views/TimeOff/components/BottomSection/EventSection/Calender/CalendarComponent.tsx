import Calendar from '@components/Calendar';
import React, { useState } from 'react';

const CalendarComponent = () => {

  const [value, onChange] = useState(new Date());
  const [reset, setReset] = useState(false);

  // console.log(value)

  const handleReset = () => {
    setReset(true)
  }

  return (
    <div className="w-full bg-white rounded-[10px] p-[15px]">

      <div className='flex items-center justify-between mb-3 lg:mb-0 3xl:mb-3'>
        <h4 className="text-[24px] font-[500]" >
          Calendar
        </h4>
      </div>

      <Calendar />
    </div>
  );
};

export default CalendarComponent;
