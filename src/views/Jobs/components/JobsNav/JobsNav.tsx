import Link from 'next/link';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io'

const JobsNav = () => {
    return (
        <div className='hidden md:block'>
            <div className="flex items-center ">
                <Link href='/'><span className='font-semibold font-base cursor-pointer'>Home</span></Link>
                <IoIosArrowForward className='text-primary' />
                <Link href='/jobs'><span className='text-primary font-semibold font-base cursor-pointer'>Jobs</span></Link>
            </div>
        </div>
    );
};

export default JobsNav;