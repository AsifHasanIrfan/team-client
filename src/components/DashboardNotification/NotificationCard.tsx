import moment from 'moment'
import React from 'react';
import Link from 'next/link';
import { BsBell } from 'react-icons/bs'

import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { dashboardNotificationCardDataProps } from '@config/types';
import { isReadNotification } from '@redux/actions/notification';

const NotificationCard: React.FC<dashboardNotificationCardDataProps> = ({ data }: dashboardNotificationCardDataProps) => {
    const dispatch = useAppDispatch()
    const { auth } = useAppSelector(state => state)

    return (
        <Link href={data.url} >
            <div
                className={`flex w-full gap-[20px] items-center !cursor-pointer p-[15px_15px_5px_15px] ${data.isRead ? "group bg-[#FFF]" : "first:rounded-t-[10px] bg-primary/[.06]"} `}
                onClick={() => {
                    if (!data.isRead) {
                        dispatch(isReadNotification(data, auth))
                    }
                }}
            >

                <div className={`rounded-[10px] h-max  ${data.isRead ? "p-[10px] !group-hover:cursor-pointer border-2 border-[#E9EBEB]" : "p-[12px] bg-primary border-none"}'}`}>
                    <BsBell className={`${data.isRead ? "text-primary" : "text-[#fff]"}  w-[16px] h-[16px]`} />
                </div>

                <div className='!group-hover:cursor-pointer'>
                    <p className='text-[14px] font-medium leading-[19.6px] line-clamp-2'>{data.content}</p>
                    <small className={`font-[14px] ${data.isRead ? "text-[#B9B9B9]" : "text-primary"}`}>
                        {moment(data.createdAt).fromNow()}
                    </small>
                </div>
            </div>
        </Link>
    );
};

export default NotificationCard;