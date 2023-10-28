import React from 'react';

import { cx } from '@config/constants';
import DailyTask from './DailyTask';
import TaskProgress from './TaskProgress';
import CreateTask from '../CreateTask';
import { useAuth } from '@state/index';

type Props = {
  members: any;
  isTeamLeader: boolean;
  filterValueTab: string;
  setFilterValueTab: (filterValueTab: string) => void;
}

const TasksHeader: React.FC<Props> = ({ filterValueTab, setFilterValueTab, members, isTeamLeader }) => {

  const { isAdmin } = useAuth();

  return (
    <div className={cx('w-full flex flex-col lg:flex-row justify-between items-center mb-5')} >
      <DailyTask
        filterValueTab={filterValueTab}
        setFilterValueTab={setFilterValueTab}
      />

      <div className="w-full sm:w-max flex flex-col sm:flex-row items-center sm:gap-8 gap-2">
        <TaskProgress />
        {(isAdmin || isTeamLeader) && <CreateTask members={members} />}
      </div>
    </div>
  );
};
export default TasksHeader;
