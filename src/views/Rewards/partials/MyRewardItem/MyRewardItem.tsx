// import { MyRewardDataTypeProps } from '@config/types';
import DgCoinFull from '@components/Icons/DGCoinFull';
import dayjs from 'dayjs';
import Image from 'next/image';

const MyRewardItem = ({ data, last }: any) => {
  return (
    <>
      <div className="flex justify-between items-center p-[22px] cursor-default">
        <div className="flex items-center gap-5">
          <Image
            src={
              data?.date
                ? '/images/rewards/reward-5.svg'
                : '/images/rewards/reward-4.svg'
            }
            width={20}
            height={22}
            alt="reward"
          />
          <div>
            <h6 className="text-base font-medium">{data.title}</h6>
            <p className="text-base font-normal mt-[5px]">
              {dayjs(data.createdAt).format('MMM D, YYYY')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">

          {data?.date ? <Image
            src="/images/rewards/reward-5.svg"
            width={20}
            height={20}
            alt="reward"
          /> : <div className='w-[20px]'><DgCoinFull /></div>}

          <h3 className="font-medium lg:text-xl text-lg text-[#13CD7F]">
            {data.amount}
          </h3>

        </div>
      </div>
      {!last && <hr />}
    </>
  );
};

export default MyRewardItem;
