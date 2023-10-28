import Link from 'next/link';
import moment from 'moment'
import React from 'react';
import { BsBell } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { dashboardNotificationCardDataProps } from '@config/types';
import { archiveNotification, isReadModalNotification, isReadNotification, unreadNotification } from '@redux/actions/notification';
import HeadlessDropdown from '@components/HeadlessDropdown';

const NotificationCard: React.FC<dashboardNotificationCardDataProps> = ({
  data,
}: dashboardNotificationCardDataProps) => {
  const dispatch = useAppDispatch()
  const { auth } = useAppSelector(state => state)

  return (
    <>
      <div className={`relative flex items-center p-[20px]
        ${!data.isRead
          ? 'bg-primary/[.06] p-[20px]'
          : 'bg-[#FFF]'
        }
      `} >
        <Link href={data.url} >
          <div
            className={`flex w-full gap-[20px] items-center 
                                first:rounded-t-[10px] group !cursor-pointer
                                
                              `}
            onClick={() => {
              if (!data.isRead) {
                dispatch(isReadNotification(data, auth))
              }
            }}
          >
            <div
              className={`rounded-[10px] h-max p-[10px] group-hover:cursor-pointer
                                ${data.isRead === false
                  ? 'bg-primary border-none'
                  : 'border-2 border-[#E9EBEB]'
                }
                              `}
            >
              <BsBell
                width={16}
                height={16}
                className={`${!data.isRead ? 'text-[#FFF]' : 'text-primary'}`}
              />
            </div>

            <div className="grow group-hover:cursor-pointer">
              <p className="text-[14px] font-medium leading-[19.6px]">
                {data.content}
              </p>
              <small
                className={`font-[14px] ${!data.isRead ? 'text-primary' : 'text-[#B9B9B9]'
                  }`}
              >
                {moment(data.createdAt).fromNow()}
              </small>
            </div>
          </div>
        </Link>

        {!data.isArchived && <HeadlessDropdown>
          <div className="rounded-xl overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="relative bg-white shadow-lg py-[5px] min-w-[150px]">
              <div
                className={`cursor-pointer block px-[10px] py-[5px] transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50`}
              >
                {
                  data.isRead ?
                    <span
                      onClick={() => dispatch(unreadNotification(data, auth))}
                    >
                      Mark as unread
                    </span>

                    :

                    <span
                      onClick={() => dispatch(isReadModalNotification(data, auth))}
                    >
                      Mark as read
                    </span>
                }
              </div>

              <div
                className={`cursor-pointer block px-[10px] py-[5px] transition duration-150 ease-in-out rounded-lg hover:bg-neutral-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50`}
                onClick={() => {
                  if (!data.isArchived) {
                    dispatch(archiveNotification(data, auth))
                  }
                }}
              > Archive </div>
            </div>
          </div>
        </HeadlessDropdown>}
      </div>

      <hr />
    </>
  );
};

export default NotificationCard;
