import Button from '@components/Button';
import { DailyTokenDataTypeProps } from '@config/types';
import Image from 'next/image';

const DailyTokenItem = ({ data }: DailyTokenDataTypeProps) => {
  return (
    <div>
      <div className="flex md:justify-between items-center md:p-[22px] p-[12px] gap-2">
        <div>
          <h6 className="font-medium md:text-base text-sm">{data.title}</h6>
          <div className="flex items-center gap-3 mt-[5px]">
            <Image
              src="/images/rewards/reward-3.png"
              width={20}
              height={20}
              alt="reward"
            />
            <p className="md:text-sm sm:text-xs">{data.point} Coins</p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            className={`inline-block md:p-[15px_14px] p-[10px_4px] border-0 font-normal text-xs rounded ${
              data.status === 'completed' && 'text-[#21B979] bg-[#21b979]/[0.1]'
            } ${
              data.status === 'assigned' && 'text-[#FF9500] bg-[#FF9500]/[0.1]'
            } ${
              data.status === 'inprogress' &&
              'text-[#0032FF] bg-[#0032FF]/[0.1]'
            }`}
          >
            {data.status === 'completed' && 'Completed'}
            {data.status === 'assigned' && 'Assigned'}
            {data.status === 'inprogress' && 'In progress'}
          </button>

          <Button
            className="md:p-[15px_45px] p-[10px_2px]"
            disabled={
              data.status === 'assigned' || data.status === 'inprogress'
            }
          >
            Claim
          </Button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default DailyTokenItem;
