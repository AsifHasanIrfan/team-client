import React from 'react';
import CardHeader from '../../partials/CardHeader';
import EventCard from './EventCard';

const DashboardEvents: React.FC = () => {
    return (
        <div className="bg-white rounded-[20px] pb-[30px] w-full">

            <CardHeader title='Events' link='dashboard/event' />

            <hr />

            <div className='px-[20px] relative '>
                <div className='bg-white opacity-[0.08]'>
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

        </div>
    );
};

export default DashboardEvents;