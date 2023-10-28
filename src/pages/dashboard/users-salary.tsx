import IsAdmin from '@components/IsAdmin';
import { useAppSelector } from '@hooks/useRedux';
import UsersSalary from '@views/UsersSalary';
import { useRouter } from 'next/router';
import React from 'react';

const UsersSalaryPage: React.FC = () => {

  const router = useRouter();

  // global variable from redux
  const { auth } = useAppSelector((state) => state);

  if (auth?.user?.email !== 'asifhasanirfan@gmail.com' && typeof window !== 'undefined') {
    router.push('/');
  }

  return (
    <IsAdmin>
      <UsersSalary />
    </IsAdmin>
  );
};
export default UsersSalaryPage;
