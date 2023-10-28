import Link from 'next/link';
import React from 'react';
import DailyTaskProgress from '../DailyTaskProgress';

const DailyTaskHeader: React.FC = () => {
    return (
        <div className='w-full flex justify-between items-center cursor-default'>

            <h2 className='h-[34px] md:text-[24px] text-base sm:text-[18px] font-medium leading-[34px]'>
                Current Tasks
            </h2>

            <div className='flex items-center md:gap-x-[40px] gap-x-[20px]'>
                <div className='max-h-[33px] gap-[5px] flex flex-col'>
                    <DailyTaskProgress />
                </div>

                <div>
                    <Link href='/dashboard/tasks' passHref>
                        <button className='font-medium md:text-base text-base text-[#7B7B7B] hover:text-primary'>View All</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DailyTaskHeader;