import React, { useState } from 'react';

import Button from '@components/Button';
import RowModal from './RowModal';

const TopSectionButton: React.FC<any> = ({ user, token, userFetch }) => {

  // states
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full md:mb-0 mb-2">
      <Button
        rounded="md"
        className="!w-full text-sm !p-5 "
        disabled={user?.workingAs === 'Intern' || user?.workingAs === 'Trial Member' || user?.isArchived}
        onClick={() => setOpen(true)}
      >
        Create Request
      </Button>

      <RowModal
        dataId={1}
        open={open}
        setOpen={setOpen}
        userId={user?._id}
        token={token}
        userFetch={userFetch}
        weeklyOffday={user?.weeklyOffday}
        availableSickDays={user?.availableTimeOff?.sickDays ? user?.availableTimeOff?.sickDays : 0}
        availableVacationDays={user?.availableTimeOff?.vacationDays ? user?.availableTimeOff?.vacationDays : 0}
      />
    </div>
  );
};
export default TopSectionButton;