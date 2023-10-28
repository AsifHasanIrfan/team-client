import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import { useAppSelector } from '@hooks/useRedux';
import React, { useState } from 'react';
import UsersSalaryTable from './components/UsersSalaryTable';
import TableHeader from './partials/TableHeader';

const UsersSalary: React.FC = () => {

  // global variable from redux
  const { auth } = useAppSelector((state) => state);

  // states
  const [value, setValue] = useState('');

  // loader
  if (!auth.token) return <FullPageLoader />

  return (
    <div className="bg-[#FFF] shadow-[0px_0px_36px_rgba(0, 0, 0, 0.05)] rounded-[20px] p-[18px_20px_20px_20px] cursor-default">
      <TableHeader value={value} setValue={setValue} />

      <div className="my-[9px]"></div>

      <UsersSalaryTable
        token={auth?.token}
        value={value}
        email={auth?.user?.email}
      />
    </div>
  );
};
export default UsersSalary;
