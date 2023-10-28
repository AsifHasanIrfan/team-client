import React from 'react';
import TopSectionButton from './TopSectionButton';
import TopSectionHeading from './TopSectionHeading';

const TopSection: React.FC<any> = ({ user, token, userFetch }) => {
  return (
    <div className='grid 2xl:grid-cols-[60%_20%] xl:grid-cols-[65%_20%] lg:grid-cols-[75%_20%] grid-col-1 gap-y-1 md:gap-y-4 lg:gap-y-0 items-center justify-between text-justify lg:text-left mb-[30px] mt-[15px] md:mt-0'>
      <TopSectionHeading />
      <TopSectionButton user={user} token={token} userFetch={userFetch} />
    </div>
  );
};

export default TopSection;
