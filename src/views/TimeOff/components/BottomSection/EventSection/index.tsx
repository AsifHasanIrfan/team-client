import React from 'react';

import Calender from './Calender';
import Vacation from './Vacation';

const EventSection = ({ user, token, userFetch }: { user: any, token: any, userFetch: any }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-1 gap-x-[30px] gap-y-[30px] justify-between 3xl:mb-0 xl:gap-x-10 3xl:gap-x-0 3xl:flex-col 3xl:w-[475px]">
      <Calender />
      <Vacation user={user} token={token} userFetch={userFetch} />
    </div>
  );
};
export default EventSection;
