import Button from '@components/Button';
import { useAppSelector } from '@hooks/useRedux';
import Image from 'next/image';

type Props = {
  userBenefits: any;
  handleUnlockBenefit: (item: any, userId: string) => void;
};

export default function AvailableBenefits({
  userBenefits,
  handleUnlockBenefit,
}: Props) {
  return (
    <>
      {userBenefits.length <= 0 && (
        <h1 className="mt-5 text-xl text-center text-red">
          You have no available benefits!
        </h1>
      )}
      <div className="mt-5 space-y-4">
        {userBenefits.map((item: any, i: any) => (
          <Card key={i} item={item} handleUnlockBenefit={handleUnlockBenefit} />
        ))}
      </div>
    </>
  );
}
// w-[55px] h-[55px] md:w-[60px] md:h-[55px] lg:w-[100px] lg:h-[80px] xl:w-[70px] xl:h-[55px] 2xl:w-[180px] 2xl:h-[90px]

function Card({ item, handleUnlockBenefit }: any) {
  const { auth } = useAppSelector((state) => state);

  return (
    <li className="flex items-center md:gap-8 lg:gap-[75px] xl:gap-[30px] 2xl:gap-5 justify-between bg-white rounded-[15px] border-l-[5px] lg:border-l-[10px] xl:border-l-[7px] 2xl:border-l-[10px] border-[#21B979] p-2.5 lg:p-8 xl:p-5 2xl:px-10 2xl:py-[30px] timeoff-shadow">
      <div className="flex items-center gap-2.5 md:gap-4 2xl:gap-6">
        <div className="shrink-0 w-[60px] h-full md:w-[70px] lg:w-[120px] xl:w-[150px] relative">
          <Image
            src={item?.imgUrl}
            alt="benefit_image"
            height={100}
            width={100}
            objectFit="cover"
          />
        </div>
        <div>
          <h3 className="text-sm md:text-base lg:text-[26px] xl:text-xl 2xl:text-3xl font-semibold text-[#1D1D1D]">
            {item?.title}
          </h3>
          <p className="text-[10px] lg:text-lg xl:text-sm 2xl:text-xs font-normal text-[#8B979F] mt-1.5">
            {item?.subDescription ? item.subDescription : 'I am DG benefit with no description.'}
          </p>
        </div>
      </div>
      <div>
        <Button
          rounded="md"
          className={`h-full !text-sm !px-[15px] w-max`}
          // disabled={loading}
          onClick={() => handleUnlockBenefit(item, auth.user._id)}
        >
          Unlock <span className="hidden md:block">for</span>
          <span className="md:flex items-center hidden">
            <Image
              src="/images/dgCoin.png"
              width={20}
              height={20}
              alt="reward"
            />
          </span>
          {'  '}
          <span className="hidden md:block">{item.dgCost}</span>
        </Button>
      </div>
      {/* <p
        onClick={() => handleUnlockBenefit(item, auth.user._id)}
        onMouseOver={() => {
          setHover(true);
        }}
        onMouseLeave={() => setHover(false)}
        className="text-right cursor-pointer transition-all ease-in-out duration-300 hover:text-red text-[10px] md:text-sm lg:text-lg xl:text-lg font-medium md:font-semibold text-[#FF9500] md:whitespace-nowrap flex items-center gap-1"
      >
        Unlock for
        {hover ? (
          <span className="relative top-[2px]">
            <Image
              src="/images/dgIcon.png"
              width={15}
              height={15}
              alt="reward"
            />
          </span>
        ) : (
          <span className="relative top-[2px]">
            <Image
              src="/images/rewards/reward-3.png"
              width={15}
              height={15}
              alt="reward"
            />
          </span>
        )}
        {item.dgCost} coin
      </p> */}
    </li>
  );
}
