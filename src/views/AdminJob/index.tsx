import Button from '@components/Button';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import { useAppSelector } from '@hooks/useRedux';
import React, { useState } from 'react'
import CreateJobModal from './CreateJobModal';
import JobDatatTable from './JobDatatTable';

type Props = {}

const AdminJob = (props: Props) => {

    // global states
    const { auth } = useAppSelector((state) => state);

    // states
    const [open, setOpen] = useState(false);

    // if not token loading
    if (!auth.token) return <FullPageLoader />

    return (
        <>
            <div className='flex justify-end mb-[20px]'>
                <div className={`w-[200px] h-[50px] mt-[10px]`}>
                    <Button rounded="md" className={`w-full h-full !text-sm !px-[15px]`} onClick={() => setOpen(true)}>
                        Create Job
                    </Button >
                </div>
            </div>

            <div className='bg-white py-[30px] px-3 shadow-[0px_0px_36px_rgba(0, 0, 0, 0.05)] rounded-[20px]'>
                <JobDatatTable token={auth?.token} />
            </div>



            <CreateJobModal
                open={open}
                setOpen={setOpen}
                token={auth?.token}
            />

        </>
    )
}

export default AdminJob