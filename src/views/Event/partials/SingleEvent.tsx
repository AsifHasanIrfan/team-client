import Image from 'next/image';
import React from 'react';

const SingleEvent: React.FC = () => {
  return (
    <div className="relative">
      <div className="w-[30px] bg-[#FF0032] absolute left-0 top-0 bottom-0 rounded-l-[15px]" />

      <div className="p-[25px] bg-[#263238] rounded-[15px] ml-[7px] overflow-hidden relative flex items-center justify-between">
        <div className="text-white">
          <h3 className="text-[16px] leading-[18px] font-[700]">
            Team Meeting
          </h3>
          <p className="text-[14px] font-[400] mt-[8px]">08:00AM - 08:45 AM</p>
        </div>

        <div className="flex gap-[-10px]">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative ml-[-11px] border-2 border-white">
            <Image
              src="/images/profile-avatar.jpg"
              layout="fill"
              alt="profile avatar"
            />
          </div>

          <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative ml-[-11px] border-2 border-white">
            <Image
              src="/images/profile-avatar.jpg"
              layout="fill"
              alt="profile avatar"
            />
          </div>

          <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative ml-[-11px] border-2 border-white">
            <Image
              src="/images/profile-avatar.jpg"
              layout="fill"
              alt="profile avatar"
            />
          </div>

          <div className="w-[40px] h-[40px] rounded-full overflow-hidden relative ml-[-11px] border-2 border-white">
            <Image
              src="/images/profile-avatar.jpg"
              layout="fill"
              alt="profile avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleEvent;
