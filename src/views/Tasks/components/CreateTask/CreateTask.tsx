import Button from '@components/Button';
import React, { useState } from 'react';
import CreateTaskModal from '../CreateTaskModal';

function CreateTask({ members }: any) {

  // states
  const [open, setOpen] = useState(false);

  return (
    <div className="w-max">
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="w-full sm:w-max"
      >
        Create task
      </Button>
      <CreateTaskModal open={open} setOpen={setOpen} dataId={0} members={members} />
    </div>
  );
}

export default CreateTask;
