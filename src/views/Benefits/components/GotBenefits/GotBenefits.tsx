import { useAppSelector } from '@hooks/useRedux';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import BenefitDetails from '../BenefitDetails/BenefitDetails';

type Props = {
  currentBenefits: [];
};

export default function GotBenefits({ currentBenefits }: Props) {

  const unlockedBenefits = currentBenefits.filter(
    (item: any) => item.isArchived
  );

  return (
    <div className="bg-white rounded-[20px] pb-6 shadow-[0px 0px 36px rgba(0, 0, 0, 0.05)] h-fit timeoff-shadow">
      <h2 className="text-lg bg-secondary px-5 rounded-tr-[20px] rounded-tl-[20px] md:text-2xl lg:text-2xl xl:text-2xl font-medium text-white py-4">
        Current Benefits You Have
      </h2>
      {unlockedBenefits.length <= 0 && (
        <h1 className="mt-8 text-xl text-center text-primary">
          You have no unlocked benefits!
        </h1>
      )}
      <div className="px-5">
        {unlockedBenefits.map((item: any, index: any) => (
          <CurrentBenefitCard key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

function CurrentBenefitCard({ item }: any) {
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [activatedDate, setActivatedDate] = useState();
  const { auth } = useAppSelector((state) => state);

  useEffect(() => {
    if (item?.purchasedUsers) {
      const a = item?.purchasedUsers?.filter(
        (e: any) => e.userId === auth.user._id
      );
      const date = a[0]?.purchasedDate;
      setActivatedDate(date);
    }
  }, [item, auth?.user]);

  return (
    <div className="flex items-center gap-5 py-4 2xl:py-6 border-b border-[gba(0, 0, 0, 0.1)] last:border-b-0">
      <div className="shrink-0 w-[60px] h-full md:w-[70px] lg:w-[120px] xl:w-[150px] 2xl:w-[180px] relative">
        <Image
          src={item?.imgUrl ? item.imgUrl : '/images/benefits/1.png'}
          alt="benefit_image"
          height={100}
          width={100}
          objectFit="cover"
        />
      </div>
      <div>
        <p className="text-sm md:text-base lg:text-[26px] xl:text-base font-medium md:font-semibold text-[#1D1D1D] pb-1 capitalize">
          {item?.title}
        </p>
        <p className="text-sm md:text-sm lg:text-base font-normal text-[#8B979F]">
          Activated - {dayjs(activatedDate).format('DD-MMM-YYYY')}
        </p>

        <button
          onClick={() => {
            setOpen(true);
            setModalData(item);
          }}
          className="text-xs md:text-sm font-bold text-lightHover cursor-pointer hover:text-red transition-all duration-300 disabled:cursor-not-allowed"
        >
          See Details
        </button>
      </div>
      <BenefitDetails setOpen={setOpen} open={open} modalData={modalData} />
    </div>
  );
}
