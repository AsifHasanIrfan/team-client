import BigSubmitedIcon from '@components/Icons/BigSubmitedIcon';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useApplyProjects from '@hooks/useApplyProjects';
import { useAppSelector } from '@hooks/useRedux';
import useUser from '@hooks/useUser';
import ApplyNow from '@views/MarketPlaceItem/Components/ApplyNow';
import Current from '@views/MarketPlaceItem/Components/Current';
import Description from '@views/MarketPlaceItem/Components/Description';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MarketplaceItemDetails = () => {
  const [currentApplication, setCurrentApplication] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  // global states
  const { auth } = useAppSelector((state) => state);

  // hook
  const { applyProjects, applyProjectsLoading } = useApplyProjects(
    auth?.token,
    `marketplaceId=${id}&user=${auth?.user?._id}`
  );
  const { applyProjects: data } = useApplyProjects(
    auth?.token,
    `marketplaceId=${id}`
  );

  // hooks
  const { user, userLoading } = useUser(auth.token, auth?.user?._id);

  // sorting data by dg coin
  useEffect(() => {
    setCurrentApplication(
      data?.datas?.sort(function (a: any, b: any) {
        return b.biddingAmount - a.biddingAmount;
      })
    );
  }, [data?.datas]);

  // if job time expired return to marketplace page
  if (data?.datas?.marketplaceId?.appliedUsers.find((item: any) => item === auth?.user?._id)) {
    router.push(`/dashboard/marketplace`)
  }

  // loader
  if (!auth.token || userLoading || applyProjectsLoading) return <FullPageLoader />;

  return (
    <section>
      {/* <div className="bg-white flex items-center w-full h-[54px] rounded-[10px] gap-[10px] px-[22px] mb-[30px]">
        <BigSubmitedIcon />
        <p className="font-400 text-[18px]">
          Your application has been submitted
        </p>
      </div> */}
      <div className="grid lg:grid-cols-6 col-span-1 lg:gap-[20px] gap-[30px] cursor-default mt-[10px] lg:mt-0">
        <div className="lg:col-span-4 col-span-1">
          <Description
            data={applyProjects?.datas[0]?.marketplaceId}
            paymentInfo={true}
            paymentMethod={applyProjects?.datas[0]?.paymentMethod}
            paymentURL={applyProjects?.datas[0]?.paymentURL}
            paymentNumber={applyProjects?.datas[0]?.paymentNumber}
            id={id}
          />
        </div>
        <div className="lg:col-span-2 col-span-1 lg:mt-0">
          <div className="grid grid-cols-1 lg:gap-[20px] gap-[30px]">
            <ApplyNow
              projectId={id}
              data={applyProjects?.datas[0]?.marketplaceId}
              availableCoin={user?.user?.dgCoin}
              onlyDetails={true}
            />
            <Current currentApplication={currentApplication} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceItemDetails;
