import BellIcon from '@components/Icons/BellIcon';
import { cx, notificationData } from '@config/constants';
import { dashboardNotificationProp } from '@config/types';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import NotificationCard from './NotificationCard';
import NotificationHeader from './NotificationHeader';

const DashboardNotification: React.FC<dashboardNotificationProp> = ({
  iconBtnStyle,
}: dashboardNotificationProp) => {
  const { notification } = useAppSelector((state) => state);
  // console.log(notification)
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showNotificationTab, setNotificationTab] = useState<boolean>();
  const [bellColor, setBellColor] = useState<string>('#263238');

  const unRead = notification?.data?.filter((i: any) => i.isArchived === false)
    .filter((i: any) => i.isRead === false);

  useEffect(() => {
    const closeOpenMenus = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        showNotificationTab &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setNotificationTab(false);
      }
    };
    document.addEventListener('mousedown', closeOpenMenus);
  }, [showNotificationTab]);

  return (
    <div className="relative dropdown" ref={dropdownRef}>
      <button
        className={iconBtnStyle}
        type="button"
        id="notificationBtn"
        data-bs-toggle="notificationBtn"
        aria-expanded="false"
        onClick={() => setNotificationTab(!showNotificationTab)}
        onMouseOver={() => setBellColor('#C10206')}
        onMouseLeave={() => setBellColor('#263238')}
      >
        {unRead?.length > 0 && (
          <div className={`rounded-full bg-primary absolute top-0 right-0 md:top-4 md:right-3 flex items-center justify-center text-white ${unRead.length > 99 ? 'w-[19px] h-[19px] text-[10px]' : 'w-[18px] h-[18px] text-[12px]'}`}>
            {unRead.length > 99 ? '99+' : unRead.length}
          </div>
        )}
        <BellIcon hoverColor={bellColor} />
      </button>

      <div
        className={cx(
          'dropdown-menu min-w-[293px] absolute drop-shadow-lg xl:left-0 lg:right-0 md:right-[-120px] right-[-63px] !z-[1000000000]',
          !showNotificationTab && 'hidden',
          'bg-white z-50 rounded-[8px] py-[15px]'
        )}
        aria-labelledby="notificationBtn"
      >
        <NotificationHeader unRead={unRead?.length} />

        <div className="px-[15px]">
          <hr className="mt-[15px] mb-[10px]" />
        </div>

        {notification.data?.filter((i: any) => i.isArchived === false).length > 0 ? (
          <>
            {notification.data
              .filter((i: any) => i.isArchived === false)
              .slice(0, 3)
              .map((item: any, index: number) => (
                <NotificationCard key={index} data={item} />
              ))}
          </>
        ) : (
          <div className="py-[20px] text-center">No notification</div>
        )}

        <div className="px-[15px]">
          <hr className="mb-[15px] mt-[15px]" />
        </div>

        <Link href="/dashboard/notifications" passHref>
          <a
            className="text-primary text-[12px] px-[15px] hover:text-red"
            onClick={() => setNotificationTab(false)}
          >
            View all notifications
          </a>
        </Link>
      </div>
    </div>
  );
};

export default DashboardNotification;
