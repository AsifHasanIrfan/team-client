import DgCoinFull from '@components/Icons/DGCoinFull';
import DgCoinsIcon from '@components/Icons/DgCoinsIcon';
import DrawBacksIcon from '@components/Icons/DrawBacksIcon';
import PRewardsIcon from '@components/Icons/PRewardsIcon';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import { useAppSelector } from '@hooks/useRedux';
import useUser from '@hooks/useUser';
import { useEffect, useState } from 'react';
import ProfileDetailsTable from './components/ProfileDetailsTable';
import ProfileSidebar from './components/ProfileSidebar';
import ProfileStatCard from './components/ProfileStatCard';

const Profile = () => {

  let totalDrawback = 0;
  let totalRewards = 0;

  // global states
  const { auth } = useAppSelector((state) => state);

  // hooks
  const { user, userLoading } = useUser(auth.token, auth?.user?._id);

  // states
  const [salaryAmount, setSalaryAmount] = useState(0);
  const [dgCoin, setDGCoin] = useState(0);

  // set value from auth state
  useEffect(() => {
    setSalaryAmount(user?.user?.monthlyPayment);
    setDGCoin(user?.user?.dgCoin);
  }, [user?.user]);

  // calculate total user drawback
  user?.user?.drawbacks?.filter((item: any) => item.type === 'by-dollar').map((item: any) => {
    totalDrawback = totalDrawback + parseFloat(item.drawback);
  });

  // calculate total user achievements
  user?.user?.achievements.map((item: any) => {
    totalRewards = totalRewards + parseFloat(item.amount);
  });

  // loader
  if (!auth.token || userLoading) return <FullPageLoader />;

  return (
    <section className="grid grid-cols-1 xl:grid-cols-[auto,400px] 3xl:grid-cols-[auto,512px] gap-[30px]">
      {/* Left Box --Start-- */}
      <div className="space-y-[15px] md:space-y-[30px]">
        {/* Profile Stats Cards --Start-- */}
        <div className="flex flex-col md:flex-row justify-between gap-[15px] md:gap-[30px]">
          <ProfileStatCard
            icon={<PRewardsIcon />}
            label="Rewards"
            value={`$${totalRewards ? totalRewards : 0}`}
          />
          <ProfileStatCard
            icon={<DrawBacksIcon />}
            label="Drawback"
            value={`$${totalDrawback ? totalDrawback : 0}`}
          />
          <ProfileStatCard
            icon={<DgCoinsIcon />}
            label="DG Coins"
            value={
              <span className="flex items-center justify-center gap-1">
                <div className="w-[33px]">
                  <DgCoinFull />
                </div>{' '}
                {dgCoin}
              </span>
            }
          />
        </div>
        {/* Profile Stats Cards --End-- */}

        <ProfileDetailsTable />
      </div>
      {/* Left Box --End-- */}

      {/* Right Box --Start-- */}
      <ProfileSidebar salaryAmount={auth?.user?.monthlyPayment ? auth?.user?.monthlyPayment : 0} />
      {/* Right Box --End-- */}
    </section>
  );
};

export default Profile;
