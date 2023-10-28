import IsAdmin from '@components/IsAdmin';
import Requests from '@views/Requests';
import React from 'react';

const RequestsPage = () => {

  return <IsAdmin>
    <Requests />
  </IsAdmin>;
};

export default RequestsPage
