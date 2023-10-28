import React from 'react';

const LoginLeftHeader = ({ title, description }: { title: string, description: string }) => {
  return (
    <div className="pb-4">
      <h2 className={`sm:text-3xl text-4xl font-bold text-secondary ${!description && 'mb-3'}`}>
        {title}
      </h2>
      {description && <p className="text-[#686E7F] py-4  sm:text-[14px] sm:leading-[21px]   lg:text-[16px] lg:leading-[26px]  xl:text-[18px] xl:leading-[28px]">
        {description}
      </p>}
    </div>
  );
};
export default LoginLeftHeader;
