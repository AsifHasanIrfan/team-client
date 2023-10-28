import React from 'react';

const TopSectionHeading: React.FC = () => {
  return (
    <div className="mb-5 md:mb-0">
      <p className="text-base font-normal leading-[22px] text-[#1D1D1D] w-full">
        This is a summary of your request time off. Once you submit a request, an admin will be notified for approval. Time off that is taken without approval, will be subject to receiving a drawback.
      </p>
    </div>
  );
};

export default TopSectionHeading;
