import Header from '@views/UserProfile/partials/Header';
import React from 'react';
import UserInfo from './UserInfo';

type Props = {
  user: any;
  setPageRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  pageRefresh: boolean;
}

const TopArea = ({ user, setPageRefresh, pageRefresh }: Props) => {
  return (
    <>
      <Header>Basic information</Header>
      <UserInfo user={user} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
    </>
  );
};
export default TopArea;
