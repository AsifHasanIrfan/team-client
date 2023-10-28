import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { readAllNotification, unreadAllNotification } from '@redux/actions/notification';

const NotificationHeader = ({ unRead }: { unRead: number }) => {
    const { auth } = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    return (
        <div className='flex items-center justify-between px-[15px]'>
            <div className='flex items-center gap-2'>
                <p className='text-[16px] font-medium'>Notification</p>
                {unRead > 0 && <span className='text-[11px] font-medium text-primary bg-[#FFE5EB] p-[2px_5px] rounded-full'>{unRead}</span>}
            </div>

            <Link href="#" passHref>
                <span className='text-primary text-[12px] hover:text-red cursor-pointer' >
                    {unRead == 0 ?
                        <span onClick={() => dispatch(unreadAllNotification(auth))} >Mark all as unread</span>
                        :
                        <span onClick={() => dispatch(readAllNotification(auth))} >Mark all as read</span>
                    }
                </span>
            </Link>
        </div>
    );
};

export default NotificationHeader;