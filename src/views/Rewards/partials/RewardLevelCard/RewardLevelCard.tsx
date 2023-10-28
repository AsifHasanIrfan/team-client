import Image from 'next/image';
import React from 'react';

const RewardLevelCard: React.FC = () => {
  const progressbarWidth = 55;
  return (
    <div
      className="relative bg-white rounded-[20px] w-full p-[30px_25px] max-h-[325px] 
    xl:p-[30px] xl:max-h-[400px] timeoff-shadow"
    >
      <div
        className="
       bg-white opacity-[0.08]
        "
      >
        <p className="text-2xl font-medium text-center">Level</p>

        {/* <div className="font-[600] md:text-[20px] text-[30px] text-center">
        <h3 className="text-primary xl:mt-[40px] mt-[20px]">Comming Soon...</h3>
      </div> */}

        <div className="text-center xl:mt-[40px] mt-[20px]">
          <Image
            src="/images/rewards/re-1.svg"
            width={108}
            height={100}
            alt="levelCard"
          />
        </div>
        <p className="text-xl font-semibold xl:mt-[41px] mt-[20px] text-center">
          Your level : 88
        </p>

        <div className="xl:mt-[42px] mt-[20px]">
          <div className="flex justify-between items-center xl:mb-[8px] mb-[5px]">
            <p className="text-base font-normal">
              Earn <span className="font-medium">249$</span> to next level
            </p>
            <h6 className="text-xl font-normal">{progressbarWidth}%</h6>
          </div>
          <div className="w-full bg-gray-200 rounded-full">
            <div
              className="bg-primary text-xs font-medium text-primary text-center py-[6px] leading-none rounded-full"
              style={{ width: progressbarWidth + '%' }}
            ></div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex justify-center items-center text-center !z-10">
        <div className="font-[600] text-[30px]">
          <h3 className="text-primary">Coming Soon...</h3>
        </div>
      </div>
    </div>
  );
};

export default RewardLevelCard;
