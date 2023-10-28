import React from 'react';
import EventSection from './EventSection';
import TableSection from './TableSection';

type Props = {
  user: any;
  token: any;
  userFetch: any
}

const BottomSection = ({ user, token, userFetch }: Props) => {
  return (
    <div className="w-full flex flex-col-reverse gap-[30px] justify-between 2xl:flex-row">
      <TableSection />
      <EventSection user={user} token={token} userFetch={userFetch} />
    </div>
  );
};
export default BottomSection;
