import React, { useState } from 'react';

// custom components
import { cx } from '@config/constants';
import TasksHeader from './components/TasksHeader';
import TaskSearchbar from './components/TasksHeader/TaskSearchbar';
import { useAppSelector } from '@hooks/useRedux';
import TaskTable from './components/TaskTable/TaskTable';
import { useAuth } from '@state/index';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useMembers from '@hooks/useMembers';
import moment from 'moment';
import EarnDGByTask from './components/EarnDG/EarnDGByTask';
import useTaskEarn from '@hooks/useTaskEarn';

const Tasks: React.FC = () => {

  // global states
  const { auth, tasks } = useAppSelector(state => state)
  const { isAdmin } = useAuth();

  // hooks
  const { taskEarn, taskEarnLoading } = useTaskEarn(auth.token, auth?.user?._id);
  const { members, membersLoading } = useMembers(auth.token);

  // short task by date
  const sortedTasks = tasks?.all_tasks?.sort(function (a: any, b: any) {
    // @ts-ignore
    return moment(b?.createdAt) - moment(a?.createdAt);
  });

  // states
  const [filterValueTab, setFilterValueTab] = useState('daily');
  const [searchByUsername, setSearchByUsername] = useState('');
  const [searchByTitle, setSearchByTitle] = useState('');
  const [searchByDes, setSearchByDes] = useState('');
  const [sortByDate, setSortByDate] = useState('');
  const [filterDropdownValue, setFilterDropdownValue] = useState('');

  if (!auth?.token || membersLoading || taskEarnLoading) return <FullPageLoader />

  return (
    <>
      <TaskSearchbar
        setSearchByTitle={setSearchByTitle}
        setSearchByDes={setSearchByDes}
        setSearchByUsername={setSearchByUsername}
        setFilterDropdownValue={setFilterDropdownValue}
        setSortByDate={setSortByDate}
      />

      {/* dg details */}
      <EarnDGByTask data={taskEarn?.data} />

      <div
        className={cx(
          'flex flex-col px-5 py-[18px] rounded-[20px] bg-[#FFFFFF] tasksPage-shadow relative cursor-default'
        )}
      >
        <TasksHeader
          filterValueTab={filterValueTab}
          setFilterValueTab={setFilterValueTab}
          members={members?.users}
          isTeamLeader={auth?.user?.workingAs === 'Team Leader' ? true : false}
        />

        <TaskTable
          datas={sortedTasks}
          isAdmin={isAdmin}
          loading={tasks.get_task_loading}
          searchByTitle={searchByTitle}
          searchByDes={searchByDes}
          filterValueTab={filterValueTab}
          searchByUsername={searchByUsername}
          filterDropdownValue={filterDropdownValue}
          sortByDate={sortByDate}
        />

      </div>
    </>
  );
};
export default Tasks;
