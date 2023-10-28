import Image from 'next/image';

const RewardEarnCard = () => {
  return (
    <div className="relative  bg-white rounded-[20px] p-[30px] w-full max-h-[325px] xl:max-h-[400px] timeoff-shadow">
      <div className="bg-white opacity-[0.08]">
        <p className="text-2xl font-medium text-center">
          <span className="text-primary"> Daily Spin </span> to Win
        </p>
        <div className="text-center xl:mt-[42px] mt-[31px]">
          <Image
            src="/images/rewards/Spinwheel.png"
            width={220}
            height={220}
            alt="levelCard"
          />
        </div>
        {/* <p className="text-[32px] font-medium xl:mt-[41px] mt-[30px] text-center">
          $1565
        </p>
        <p className="text-base font-normal mt-[5px] text-center">Total earn</p> */}
      </div>
      <div className="absolute inset-0 flex justify-center items-center text-center !z-10">
        <div className="font-[600] text-[30px]">
          <h3 className="text-primary">Coming Soon...</h3>
        </div>
      </div>
    </div>
  );
};

export default RewardEarnCard;
