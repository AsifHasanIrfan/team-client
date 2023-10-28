import { useAuth } from '@state/index';
import EventCard from '@views/Dashboard/components/DashboardEvents/EventCard';
import React, { useState } from 'react';
import CreateEventModal from './CreateEventModal';

const UpcomingEvent = () => {
  const [open, setOpen] = useState(false);
  const { isAdmin } = useAuth();
  return (
    <div className="w-full lg:w-[50%] xl:w-[455px] bg-white rounded-[10px] p-[20px] timeoff-shadow">
      <div className="flex justify-between items-center  mb-[15px]">
        <h4 className="text-[24px] leading-[33px] font-[500]">
          Upcoming event
        </h4>

        {isAdmin && (
          <button
            onClick={() => setOpen(true)}
            className="bg-primary hover:bg-lightHover duration-150 text-slate-50 rounded-md px-4 py-1.5"
          >
            Create event
          </button>
        )}
      </div>

      <div className="space-y-[10px] relative">

        <div className='bg-white opacity-[0.08]'>
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>

        <div className="absolute inset-0 flex justify-center items-center text-center !z-10">
          <div className="font-[600] text-[30px]">
            <h3 className="text-primary">Coming Soon...</h3>
          </div>
        </div>
      </div>
      <CreateEventModal dataId={0} open={open} setOpen={setOpen} />
    </div>
  );
};

export default UpcomingEvent;
