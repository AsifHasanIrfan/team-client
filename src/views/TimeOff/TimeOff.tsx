import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import { useAppSelector } from '@hooks/useRedux';
import useUser from '@hooks/useUser';
import React from 'react';

import BottomSection from './components/BottomSection';
import TopSection from './components/TopSection';

const TimeOff: React.FC = () => {

  // global sates
  const { auth } = useAppSelector((state) => state);

  // hooks
  const { user, userLoading, userFetch } = useUser(auth.token, auth.user?._id);

  // loader
  if (!auth.token || userLoading) return <FullPageLoader />

  return (
    <div className="w-full flex flex-col">
      <TopSection user={user?.user} token={auth?.token} userFetch={userFetch} />
      <BottomSection user={user?.user} userFetch={userFetch} token={auth?.token} />
    </div>
  );
};
export default TimeOff;
