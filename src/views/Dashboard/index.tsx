import React, { useEffect, useState } from 'react';

//internal imports
import { useAppSelector } from '@hooks/useRedux';
import DashboardDailyTask from './components/DashboardDailyTask';
import DashboardDrawBacks from './components/DashboardDrawBacks';
import DashboardEvents from './components/DashboardEvents';
import DashboardQuickLinks from './components/DashboardQuickLinks';
import DashboardRewards from './components/DashboardRewards';
import StatusUpdate from './components/StatusUpdate';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useDgsById from '@hooks/useDgsById';
import useAchievementsById from '@hooks/useAchievementsById';
import useUser from '@hooks/useUser';

const Dashboard: React.FC = () => {

  const today = new Date();

  // global states
  const { auth } = useAppSelector((state) => state);

  // hooks
  const { dgs, dgsLoading } = useDgsById(auth?.token, auth?.user?._id);
  const { user, userLoading, userFetch } = useUser(auth?.token, auth?.user?._id);
  const { achievements, achievementsLoading } = useAchievementsById(auth?.token, auth?.user?._id);

  // states
  const [isChecked, setIsChecked] = useState(false);
  const [newDatas, setNewData] = useState<any>([]);

  // is user already checked in
  useEffect(() => {
    const findCheked = user?.user?.attendance?.find((item: any, index: number) => item.createdAt.slice(0, 10) === today.toISOString().slice(0, 10))

    if (findCheked) {
      setIsChecked(true)
    } else {
      setIsChecked(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.user])

  // reward data
  useEffect(() => {
    if (dgs?.datas?.length > 0 && achievements?.datas?.length > 0) {
      setNewData([...dgs?.datas, ...achievements?.datas])
    } else if (dgs?.datas?.length > 0) {
      setNewData([...dgs?.datas])
    } else if (achievements?.datas?.length > 0) {
      setNewData([...achievements?.datas])
    } else {
      setNewData([])
    }
  }, [dgs?.datas, achievements?.datas])

  // loading
  if (!auth.token || achievementsLoading || dgsLoading || userLoading) return <FullPageLoader />

  return (
    <div className="grid xl:grid-cols-6 lg:grid-cols-2 grid-cols-1 gap-[20px]">
      <div className="col-span-1 xl:col-span-4 lg:col-span-2">
        <div>
          <StatusUpdate />
        </div>
        <div className="my-[20px] lg:hidden xl:block block">
          <DashboardDailyTask />
        </div>

        {/* 1200px design only */}
        <div className="grid-cols-8 gap-[20px] hidden lg:grid xl:hidden">
          <div className="my-[20px] lg:col-span-5">
            <DashboardDailyTask />
          </div>
          <div className="lg:my-[20px] lg:col-span-3 lg:block xl:hidden hidden">
            <DashboardQuickLinks
              token={auth.token}
              userId={auth?.user?._id}
              isChecked={isChecked}
              userFetch={userFetch}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-[20px]">

          <DashboardRewards
            datas={newDatas}
          />

          <DashboardDrawBacks
            token={auth.token}
            userId={auth.user?._id}
          />
        </div>
      </div>
      <div className="col-span-1 xl:col-span-2 lg:col-span-3">
        <div className="mb-[20px] lg:hidden xl:block block">
          <DashboardQuickLinks
            token={auth.token}
            userId={auth?.user?._id}
            isChecked={isChecked}
            userFetch={userFetch}
          />
        </div>
        <div>
          <DashboardEvents />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
