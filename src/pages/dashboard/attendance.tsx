import IsAdmin from '@components/IsAdmin';
import Attendance from '@views/Attendance';
import React from 'react';

function AttendancePage() {
  return (
    <IsAdmin>
      <Attendance />
    </IsAdmin>
  );
}

export default AttendancePage;
