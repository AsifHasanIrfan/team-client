import TableTitle from '@views/Requests/partials/TableTitle';
import React, { useState } from 'react';
import UserInfoHeader from '../../partials/UserInfoHeader';
import UserInfoMain from '../../partials/UserInfoMain';

function UserInfoRequests({ updateRequestData, token }: any) {

  const [filterBy, setFilterBy] = useState('progress');
  const [filterData, setFilterData] = useState([]);
  const [value, setValue] = useState('');

  return (
    <>
      <TableTitle
        pageTitle='User Information Request'
        setFilterBy={setFilterBy}
        filterBy={filterBy}
        value={value}
        setValue={setValue}
        isSearchFieldRequired={false}
        isFilterTabRequired={false}
      />
      {/* <UserInfoHeader /> */}
      <UserInfoMain updateRequestData={updateRequestData} token={token} />
    </>
  );
}

export default UserInfoRequests;
