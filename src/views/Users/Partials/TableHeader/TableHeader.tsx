import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
    value: string;
    setValue: (value: string) => void;
}

const TableHeader = ({ value, setValue }: Props) => {

    // default
    const router = useRouter();

    return (
        <div className='flex justify-between items-center user__management-header mb-[18px]'>
            <div className='flex md:gap-[30px] sm:gap-[20px] gap-[5px] items-center'>

                <Link href="/dashboard/users" passHref>
                    <button type='button' className={`md:text-[24px] text-[14px] outline-none font-medium ${router.route === '/dashboard/users/archived' && 'text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300'}`}>Active Users</button>
                </Link>

                <Link href="/dashboard/users/archived" passHref>
                    <button type='button' className={`md:text-[24px] text-[14px] outline-none font-medium ${router.route === '/dashboard/users' && 'text-[#CCCCCC] hover:text-darkHover transition  ease-in-out duration-300'}`}>Archived Users</button>
                </Link>

            </div>

            <div>
                {/* ================ leaderboard search ========================= */}
                <input
                    id='search'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder='Search by username'
                    className={`focus:outline-none rounded-[8px] border border-[#E0E0E0] w-full md:w-[280px] lg:w-[350px]  py-3 px-5`}
                />
                {/* ================ leaderboard search ========================= */}
            </div>
        </div>
    );
};

export default TableHeader;