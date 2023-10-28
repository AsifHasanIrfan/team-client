// external imports
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// internal imports
import UserCardsInfo from './components/UserCardsInfo';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { getUser } from '@redux/actions/users';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import UserPaymentInfo from './components/UserPaymentInfo';
import TopArea from './components/UserInfo';
import { GetStaticPropsContext } from 'next';
import UpdateUserInfo from './components/UserUpdateInfo/UpdateUserInfo';
import Timeoff from './components/Timeoff/Timeoff';
import useUser from '@hooks/useUser';
import DrawbackTimeoff from './components/DrawbackTimeoff/DrawbackTimeoff';

const UserProfile: React.FC = () => {

  // get dynamic id
  const router = useRouter();
  const { id } = router.query;

  // global states
  const dispatch = useAppDispatch();
  const { auth, users } = useAppSelector((state) => state);

  // hooks
  const { user, userLoading, userFetch } = useUser(auth.token, id as string);

  // states
  const [pageRefresh, setPageRefresh] = useState(false);

  //if token there get user data
  useEffect(() => {
    dispatch(getUser(auth.token, id as string));
  }, [dispatch, auth.token, id]);

  useEffect(() => {
    dispatch(getUser(auth.token, id as string));
    setTimeout(() => {
      setPageRefresh(false);
    }, 6000);
  }, [pageRefresh, dispatch, auth.token, id]);

  // loader
  if (!auth.token || users.user_get_loading || userLoading) return <FullPageLoader />

  return (
    <div className="flex flex-col w-full profile_datatable">

      <div className="w-full px-[30px] pt-[18px] pb-[25px] rounded-[20px] bg-[#FFFFFF] tasksPage-shadow relative">
        <TopArea
          user={users?.user}
          pageRefresh={pageRefresh}
          setPageRefresh={setPageRefresh}
        />
        <UpdateUserInfo
          user={users?.user}
          token={auth.token}
          userId={id}
        />
      </div>

      <Timeoff
        token={auth.token}
        userId={id}
        user={user?.user}
        userFetch={userFetch}
      />

      <DrawbackTimeoff
        token={auth.token}
        userId={id}
        user={user?.user}
        userFetch={userFetch}
      />

      {(auth?.token && auth?.user?.email === 'asifhasanirfan@gmail.com') ? <UserPaymentInfo
        userId={id}
        token={auth.token}
      /> : null}

      <UserCardsInfo
        userId={id}
        token={auth.token}
        user={users?.user}
      />
    </div>
  );
};
export default UserProfile;

// server side rendering
export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params;
  return {
    props: {
      id,
    },
  };
}
