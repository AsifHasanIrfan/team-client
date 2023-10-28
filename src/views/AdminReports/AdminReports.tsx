import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import { useAppSelector } from '@hooks/useRedux';
import useReports from '@hooks/useReports';
import React from 'react'
import ReportsTable from './components/ReportsTable/ReportsTable'

type Props = {}

const AdminReports = (props: Props) => {


    // global variable from redux
    const { auth } = useAppSelector((state) => state);

    // hooks
    const { reports, reportsLoading } = useReports(auth.token);

    // loading
    if (!auth.token) <FullPageLoader />

    return (
        <>
            <div className='bg-[#FFF] shadow-[0px_0px_36px_rgba(0, 0, 0, 0.05)] rounded-[20px] p-[18px_20px_20px_20px]'>

                <div className='flex md:gap-[30px] sm:gap-[20px] gap-[5px] items-center'>
                    <h2 className={`md:text-[24px] text-[14px] outline-none font-medium text-darkHover cursor-default`}>Reports</h2>
                </div>

                <div className='my-[9px]'></div>

                <ReportsTable datas={reports?.datas} loading={reportsLoading} />

            </div>
        </>
    )
}

export default AdminReports