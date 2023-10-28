import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import { IRootState } from '@config/types';
import { useAppSelector } from '@hooks/useRedux';
import NotificationCard from '@views/Notifications/components/NotificationCard';
import NotificationMenu from '@views/Notifications/components/NotificationMenu';
import { useEffect, useState } from 'react';

const Index = () => {
  const [openTab, setOpenTab] = useState<number>(1);
  const { notification, auth } = useAppSelector((state: IRootState) => state);

  const [unreadDatas, setUnreadDatas] = useState<any>([]);
  const [archivedDatas, setArchivedDatas] = useState<any>([]);
  const [unarchivedDatas, setUnarchivedDatas] = useState<any>([]);

  useEffect(() => {
    const uniqueNotification = notification?.data?.reduce(
      (acc: any, current: any) => {
        const n = acc.find((item: any) => item._id === current._id);
        if (!n) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      },
      []
    );

    setUnarchivedDatas(
      uniqueNotification?.filter((item: any) => item.isArchived == false)
    );
    setArchivedDatas(
      uniqueNotification?.filter((item: any) => item.isArchived == true)
    );
    setUnreadDatas(
      uniqueNotification
        .filter((item: any) => item.isArchived == false)
        .filter((item: any) => item.isRead == false)
    );
  }, [notification.data]);

  if (!auth.token || notification.loading) return <FullPageLoader />;

  return (
    <div className="grid 3xl:grid-cols-[65%]">
      <NotificationMenu openTab={openTab} setOpenTab={setOpenTab} />

      <div className="rounded-[10px] bg-[#FFF] pb-[16px] timeoff-shadow">
        {openTab === 1 && (
          <>
            {unarchivedDatas.length > 0 ? (
              unarchivedDatas.map((item: any, index: number) => (
                <NotificationCard key={index} data={item} />
              ))
            ) : (
              <div className="py-[20px] text-center"> No notification </div>
            )}
          </>
        )}

        {openTab === 2 && (
          <>
            {unreadDatas.length > 0 ? (
              unreadDatas.map((item: any, index: number) => (
                <NotificationCard key={index} data={item} />
              ))
            ) : (
              <div className="py-[20px] text-center">
                {' '}
                No unread notification{' '}
              </div>
            )}
          </>
        )}

        {openTab === 3 && (
          <>
            {archivedDatas.length > 0 ? (
              archivedDatas.map((item: any, index: number) => (
                <NotificationCard key={index} data={item} />
              ))
            ) : (
              <div className="py-[20px] text-center">
                No archived notification{' '}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
