import DailyTaskHeader from '@views/Dashboard/partials/DailyTaskHeader';
import React from 'react';
import DailyTaskTable from '../../partials/DailyTaskTable';

const DashboardDailyTask: React.FC = () => {
    return (
        <div className='px-5 py-[18px] rounded-[20px] bg-[#FFFFFF] tasksPage-shadow relative'>
            <DailyTaskHeader />
            <DailyTaskTable />
        </div>
    );
};

export default DashboardDailyTask;