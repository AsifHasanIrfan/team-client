import React from 'react';
import JobsNav from '@views/Jobs/components/JobsNav';
import Career from '@views/Home/components/Career';
import useJobs from '@hooks/useJobs';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';

const Jobs = () => {

    // hooks
    const { jobs, jobsLoading } = useJobs('');

    // loader
    if (jobsLoading) return <FullPageLoader />

    return (
        <main className='lg:pt-[200px] md:pt-[180px] pt-[100px] lg:pb-[100px] md:pb-[80px] pb-[80px] bg-[#F7F8FA]'>
            <div className='container'>
                <JobsNav />
                <Career />
            </div>
        </main>
    );
};

export default Jobs;