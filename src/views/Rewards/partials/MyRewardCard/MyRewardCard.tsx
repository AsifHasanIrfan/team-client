import React from 'react';
import MyRewardItem from '../MyRewardItem';

const MyRewardCard: React.FC<any> = ({ datas }) => {


  return (
    <div className="bg-white rounded-[20px] pb-[30px] w-full timeoff-shadow h-fit">
      {/* <div className="bg-white opacity-[0.08]"> */}
      <h4 className="font-2xl font-medium py-[18px] pl-[20px]">My Rewards</h4>
      <hr className="block md:hidden" />

      <div className="h-fit scrolbar max-h-[400px] overflow-y-auto">
        {datas?.map((item: any, index: any) => (
          <MyRewardItem
            key={index}
            data={item}
            last={datas.length - 1 === index}
          />
        ))}

        {!datas?.length && (
          <h1 className="mt-8 text-xl text-center text-primary">
            No records to display!
          </h1>
        )}
      </div>
      {/* </div> */}
      {/* <div className="absolute inset-0 flex justify-center items-center text-center z-10">
        <div className="font-[600] text-[30px]">
          <h3 className="text-primary">Coming Soon...</h3>
        </div>
      </div> */}
    </div>
  );
};

export default MyRewardCard;
