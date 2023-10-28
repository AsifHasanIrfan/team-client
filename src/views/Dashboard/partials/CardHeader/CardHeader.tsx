import { DashboardHeaderTitltProps } from '@config/types';
import Link from 'next/link';
import React from 'react';

const CardHeader = ({ title, link }: DashboardHeaderTitltProps) => {
    return (
        <div className='flex justify-between items-center p-[20px_22px]'>
            <h4 className='font-2xl font-medium cursor-default'>{title}</h4>
            <Link href={`/${link}`} passHref>
                <button type='button' className='font-medium text-base text-[#7B7B7B] hover:text-primary transition ease-in-out duration-300'>View All</button>
            </Link>
        </div>
    );
};

export default CardHeader;