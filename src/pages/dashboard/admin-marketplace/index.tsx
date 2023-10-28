import IsAdmin from '@components/IsAdmin';
import React from 'react';
import AdminJobPost from '@views/AdminMarketplace';

function AdminMarketplace() {
  return (
    <IsAdmin>
      <AdminJobPost />
    </IsAdmin>
  );
}

export default AdminMarketplace;
