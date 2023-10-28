import DgCoinFull from '@components/Icons/DGCoinFull';
import DgCoinIcon from '@components/Icons/DgCoinIcon';
import Image from 'next/image';

type Props = {
  tokenAmount: number;
};

const RewardTokenCard = ({ tokenAmount }: Props) => {
  return (
    <div
      className="bg-white rounded-[20px] p-[30px] w-full max-h-[325px] col-auto
                md:col-span-full md:p-[25px]
                lg:col-auto
                xl:max-h-[400px] timeoff-shadow 
        "
    >
      <div className="md:flex md:justify-between md:items-center md:flex-row lg:flex-col flex-col ">
        <div className="lg:flex-none">
          <p className="text-2xl font-medium text-center">
            Your total <span className="text-primary">DG Coins</span>
          </p>
        </div>
        <div className="flex-col justify-center items-center text-center mt-12">
          <div className="flex justify-center items-center gap-2 xl:mt-[41px] md:mt-[20px] my-[30px]">
            <div className='w-[40px]'><DgCoinFull /></div>
            <h3 className="font-semibold text-4xl">
              {tokenAmount}
              <span className="text-base ml-1">DG Coins</span>
            </h3>
          </div>
          <div className="lg:flex-none lg:[mt-30px] md:mt-[0px] mt-[30px]">
            <p className="text-base font-normal  xl:mb-[61px] mb-[30px] text-center">
              Use your DG coins to purchase benefits
            </p>
            {/* <div className="flex lg:justify-center md:justify-end justify-center xl:mt-[61px] lg:mt-[30px]">
            <Button>Claim Coins</Button>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardTokenCard;
