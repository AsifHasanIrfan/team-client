import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import { useAppSelector } from '@hooks/useRedux';
import React, { useState, useEffect } from 'react';
import CurrentEmployeeOfTheMonth from './components/CurrentEmployeeOfTheMonth';
import LeaderboardSection from './components/LeaderboardSection';
import MyProfileInfoCard from './components/MyProfileInfoCard';
import useEMP from '../../hooks/useTeamMemberOfTheMonth';
import useMembers from '@hooks/useMembers';
import TeamRD from './components/TeamRD/TeamRD';
import useTeamReward from '@hooks/useTeamReward';

const Team = () => {

  // global variable from redux
  const { auth } = useAppSelector((state) => state);

  // hooks
  const { members, membersLoading } = useMembers(auth.token);
  const { emps, empsLoading } = useEMP(auth.token);
  const { teamReward, teamRewardLoading, teamRewardFetch } = useTeamReward(auth.token);

  // states to set profile card
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [profileData, setProfileData] = useState({});

  // active and not admin users 
  useEffect(() => {
    setActiveEmployees(members?.users?.filter((item: any) => item.role !== 'admin' && item.isArchived === false && item.username !== 'mockuser'));
  }, [members?.users]);

  // if user data there set profile data
  useEffect(() => {
    if (activeEmployees?.length > 0) {
      setProfileData(activeEmployees[Math.floor(Math.random() * activeEmployees.length)]);
    }
  }, [activeEmployees]);

  // if no token & api fetching loading will go on
  if (!auth.token || membersLoading || empsLoading || teamRewardLoading) return <FullPageLoader />;

  return (
    <>
      <section className="grid grid-cols-4 xl:grid-cols-8 3xl:grid-cols-4 gap-[30px] xl:gap-[20px] 3xl:gap-[30px] mt-[20px] sm:mt-0">
        <div className="col-span-4 xl:col-span-6 3xl:col-span-3 h">
          <LeaderboardSection
            datas={activeEmployees}
            profileData={profileData}
            setProfileData={setProfileData}
          />
        </div>

        <div className="col-span-4 xl:col-span-2 3xl:col-span-1">
          <div className="md:grid md:grid-cols-1 md:gap-[30px]">

            <CurrentEmployeeOfTheMonth
              datas={emps?.datas}
            />

            <div className="hidden xl:block md:mt-[30px] xl:mt-[15px] 2xl:mt-[30px]">
              <MyProfileInfoCard data={profileData} />
            </div>

            <TeamRD
              fDatas={teamReward?.datas}
              teamRewardFetch={teamRewardFetch}
              token={auth?.token}
              isAdmin={auth?.user?.role === 'admin'}
            />

          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
