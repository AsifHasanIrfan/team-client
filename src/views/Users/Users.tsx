import { useAppSelector } from '@hooks/useRedux';
import { userSearchValueAtom } from '@state/index';
import { useAtom } from 'jotai';
import Link from 'next/link';
import React, { useState } from 'react';
import AddTimeoffModal from './components/AddTimeoffModal/AddTimeoffModal';
import UserTable from './components/UserTable';
import TableHeader from './Partials/TableHeader';

const Users: React.FC = () => {

    // global
    const { auth } = useAppSelector((state) => state);

    // states
    const [value, setValue] = useAtom(userSearchValueAtom);
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='flex gap-10 justify-end mb-10 mr-2 mt-5 md:mt-0'>

                <button
                    type='button'
                    onClick={() => setOpen(true)}
                    className='text-primary hover:text-lightHover transition ease-in-out duration-300 hover:underline font-semibold'
                >
                    Add Timeoff
                </button>

                <Link href={'/dashboard/attendance'}>
                    <a href="" className='text-primary hover:text-lightHover transition ease-in-out duration-300 hover:underline font-semibold'>
                        Attendance
                    </a>
                </Link>
                <Link href={'/dashboard/users/reports'}>
                    <a href="" className='text-primary hover:text-lightHover transition ease-in-out duration-300 hover:underline font-semibold'>
                        Reports
                    </a>
                </Link>
            </div>

            <div className='bg-[#FFF] shadow-[0px_0px_36px_rgba(0, 0, 0, 0.05)] rounded-[20px] p-[18px_20px_20px_20px]'>

                <TableHeader value={value} setValue={setValue} />

                <div className='my-[9px]'></div>

                <UserTable />

            </div>

            <AddTimeoffModal open={open} setOpen={setOpen} token={auth?.token} />
        </>
    );
};

export default Users;