import React from 'react';

const ViewLess = ({ active }: { active: boolean }) => {
  return (
    <div className="w-full cursor-pointer">
      <span className="text-[#454545] font-normal text-base hover:text-lightHover">
        {!active ? 'View history' : 'Less'}
      </span>
    </div>
  );
};
export default ViewLess;
