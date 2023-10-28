import React from 'react';

type StatusProps = {
  status: String;
};

const Status: React.FC<StatusProps> = ({ status }) => {
  return (
    <div
      className={`${status === 'paid' && 'bg-[#E9F8F2]'} ${status === 'processing' && 'bg-[#FFF4E5]'} ${status === 'cancel' && 'bg-[#FF00001A]'
        } capitalize py-[5px] px-[10px] rounded-[5px] text-center] w-[85px]`}
    >
      <span
        className={`${status === 'paid' && 'text-[#21B979] px-5'} ${status === 'processing' && 'text-[#FF9500]'} 
        ${status === 'cancel' && 'text-[#FF0000]'} capitalize text-[12px] leading-[16px] font-[400] text-center w-full block`}
      >
        {status === 'cancel' ? 'cancelled' : status}
      </span>
    </div>
  );
};

export default Status;
