import React from 'react';

import Calendar from './components/CalendarComponent';
import ScheduleCalendar from './components/ScheduleCalendar';
import UpcomingEvent from './components/UpcomingEvent';

const Index: React.FC = () => {
  return (
    <div className="space-y-[30px] xl:space-y-0 xl:flex xl:gap-[30px] w-full">

      <div className="flex-auto">
        <ScheduleCalendar />
      </div>

      <div className="space-y-[30px] lg:space-y-0 lg:space-x-[30px] xl:space-x-0 xl:space-y-[30px] lg:flex items-start xl:block">
        <UpcomingEvent />
        <Calendar />
      </div>
    </div>
  );
};

export default Index;
