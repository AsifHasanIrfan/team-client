import React from 'react';

function UserInfoHeader() {
  return (
    <div className="w-[578px] md:w-full h-[48px] rounded-[10px] flex justify-between items-center bg-[#263238] ">
      <div className="ml-[25px] w-[93px]">
        <h2 className=" text-[#FFFFFF] text-sm leading-[20px] ">Full name</h2>
      </div>
      <div className="w-[57px]">
        <h2 className=" text-[#FFFFFF] text-sm leading-[20px]">Username</h2>
      </div>
      <div className="w-[60px]">
        <h2 className=" text-[#FFFFFF] text-sm leading-[20px]">Email</h2>
      </div>

      <div className="flex justify-end ">
        <h2 className=" text-[#FFFFFF] text-sm leading-[20px] pr-[25px]">
          Review
        </h2>
      </div>
    </div>
  );
}

export default UserInfoHeader;
