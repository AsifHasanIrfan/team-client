import BigSubmitedIcon from '@components/Icons/BigSubmitedIcon';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useApplyProjects from '@hooks/useApplyProjects';
import useMarketplace from '@hooks/useMarketplace';
import { useAppSelector } from '@hooks/useRedux';
import useUser from '@hooks/useUser';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ApplyNow from './Components/ApplyNow';
import Current from './Components/Current';
import Description from './Components/Description';

type Props = {
  onlyDetails: boolean;
};

const MarketplaceItem = ({ onlyDetails }: Props) => {
  const [currentApplication, setCurrentApplication] = useState([])
  const router = useRouter();
  const { id } = router.query;

  // global states
  const { auth } = useAppSelector((state) => state);

  // hooks
  const { marketplace, marketplaceLoading } = useMarketplace(auth.token, id);

  const query = `marketplaceId=${id}`
  const { applyProjects } = useApplyProjects(auth?.token, query);

  const { user, userLoading } = useUser(auth.token, auth?.user?._id);

  // sorting data by dg coin
  useEffect(() => {
    setCurrentApplication(
      applyProjects?.datas?.sort(function (a: any, b: any) {
        return b.biddingAmount - a.biddingAmount;
      })
    );
  }, [applyProjects?.datas]);

  // // if already appiled user can see details page
  //   const checkUserApplied = marketplace?.data?.appliedUsers.find(
  //     (item: any) => item === auth?.user?._id
  //   );

  //     if (!checkUserApplied) {
  //       router.push(`/dashboard/marketplace`);
  //     }

  // loader
  if (!auth.token || marketplaceLoading || userLoading) return <FullPageLoader />;

  return (
    <>
      {onlyDetails && (
        <div className="bg-white flex items-center w-full h-[54px] rounded-[10px] gap-[10px] px-[22px] mb-[30px]">
          <BigSubmitedIcon />
          <p className="font-400 text-[18px]">
            Your application has been submitted
          </p>
        </div>
      )}
      <section className="grid lg:grid-cols-6 col-span-1 lg:gap-[20px] gap-[30px] cursor-default mt-[10px] lg:mt-0">
        <div className="lg:col-span-4 col-span-1">
          <Description data={marketplace?.data} />
        </div>
        <div className="lg:col-span-2 col-span-1 lg:mt-0">
          <div className="grid grid-cols-1 lg:gap-[20px] gap-[30px]">
            <ApplyNow
              projectId={id}
              data={marketplace?.data}
              availableCoin={user?.user?.dgCoin}
            />
            <Current currentApplication={currentApplication} />
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketplaceItem;
