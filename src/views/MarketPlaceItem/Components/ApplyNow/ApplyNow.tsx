import Button from '@components/Button';
import DgCoinFull from '@components/Icons/DGCoinFull';
import { useTimer } from '@hooks/useTimer';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

type Props = {
  projectId: any;
  data: any;
  availableCoin: number;
  onlyDetails?: boolean;
};

const ApplyNow = ({ data, availableCoin, projectId, onlyDetails }: Props) => {
  const router = useRouter();

  const { days, hours, minutes, seconds, isExpired } = useTimer(
    data?.expiredDate
  );

  return (
    <div className="rounded-[20px] bg-[#FFFFFF] tasksPage-shadow h-max text-center pb-[30px] order-2 lg:order-none">
      <div className="bg-[#1D1D1D] rounded-t-[20px]">
        <h5 className="text-[18px] font-bold py-[14px] text-white">
          {isExpired
            ? 'Time has expired'
            : `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`}
        </h5>
      </div>

      <div className="my-[30px]">
        <p className="text-[18px] flex justify-center items-center gap-1">
          Bidding Amount:
          <span className="w-[24px] relative -top-[2px]">
            <DgCoinFull />
          </span>
          <strong>{data?.costOfCoin ? data?.costOfCoin : 0} DG coins</strong>
        </p>
        <p className="text-[18px] mt-3 flex justify-center items-center gap-1">
          Available Amount:
          <span className="w-[24px] relative -top-[2px]">
            <DgCoinFull />
          </span>
          <strong>{availableCoin ? availableCoin : 0} DG coins</strong>
        </p>
      </div>

      <div className="flex justify-center xl:p-0 md:px-5">
        {onlyDetails ? (
          <Button
            onClick={() =>
              Swal.fire({
                title: 'Are you sure you want to place bid?',
                text: 'This coins will not be refunded.',
                showCancelButton: true,
                cancelButtonColor: '#6e7d88',
                cancelButtonText: 'Cancel',
                confirmButtonText: 'Confirm',
                reverseButtons: true,
              }).then((result) => {
                if (result.isConfirmed) {
                  router.push(`/dashboard/marketplace/update/${projectId}`);
                }
              })
            }
            rounded="full"
          >
            Place new bid
          </Button>
        ) : (
          <Button
            onClick={() => router.push(`apply/${projectId}`)}
            disabled={isExpired || data?.costOfCoin > availableCoin}
            rounded="full"
          >
            Apply Now for {data?.costOfCoin} DG Coins
          </Button>
        )}
      </div>
    </div>
  );
};

export default ApplyNow;
