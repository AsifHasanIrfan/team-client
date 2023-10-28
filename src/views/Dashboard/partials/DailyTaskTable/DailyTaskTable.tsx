import TableLoader from '@components/Loaders/TableLoader';
import { useAppSelector } from '@hooks/useRedux';
import { useAuth } from '@state/index';
import StatusField from '@views/Tasks/components/StatusFiled/StatusField';
import RowModal from '@views/Tasks/components/TaskTable/RowModal';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BsEye } from 'react-icons/bs';

const DailyTaskTable = () => {
  // global states
  const { tasks } = useAppSelector((state) => state);
  const { isAdmin } = useAuth();

  // short task by date
  const sortedTasks = tasks?.all_tasks?.sort(function (a: any, b: any) {
    // @ts-ignore
    return moment(b?.createdAt) - moment(a?.createdAt);
  });

  // states
  const [open, setOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState(
    tasks?.all_tasks?.filter((e: any) => (e.status !== 'Approved' && e.status !== 'Approved Late' && e.status !== 'Completed' && e.status !== 'Completed Late')).slice(0, 4)[0]
  );

  useEffect(() => {
    if (typeof window !== undefined) {
      document.getElementById('daily-task-table')!.scrollLeft = 350;
    }
  }, []);

  // columns
  const userColumn: TableColumn<any>[] = [
    {
      name: 'Title',
      selector: (row) => row && <span title={row.title}>{row?.title}</span>,
    },
    {
      name: 'Due Date',
      selector: (row) => {
        const time = moment(row.dueDateAndTime);
        const displayCutoff = time.tz(moment.tz.guess()).format('YYYY-DD-MM');
        return displayCutoff;
      },
    },
    {
      name: 'Due Time',
      selector: (row) => {
        const time = moment(row.dueDateAndTime);
        const displayCutoff = time.tz(moment.tz.guess()).format('hh:mm A');
        return displayCutoff;
      },
    },
    {
      name: 'Created',
      selector: (row) => {
        const time = moment(row.createdAt);
        const displayCutoff = time.tz(moment.tz.guess()).format('YYYY-DD-MM');
        return displayCutoff;
      },
      width: '150px',
    },
    {
      name: 'Status',
      selector: (row) => row && <StatusField status={row.status} />,
    },
    {
      name: 'Action',
      selector: (row) => (
        <div
          className="w-[65px] h-[25px] flex items-center justify-between cursor-pointer group"
          onClick={() => {
            setModalData(row);
            setOpen(true);
          }}
        >
          <BsEye className="w-[25px] h-[25px] group-hover:!text-primary transition ease-in-out duration-300" />
          <p className="text-sm font-medium w-[35px] h-[22px] group-hover:!text-primary relative top-[2px] transition ease-in-out duration-300">
            View
          </p>
        </div>
      ),
    },
  ];

  // columns
  const adminColumn: TableColumn<any>[] = [
    {
      name: 'Full Name',
      selector: (row) =>
        row && (
          <span title={row?.worker?.firstName + ' ' + row?.worker?.lastName}>
            {row?.worker?.firstName + ' ' + row?.worker?.lastName}
          </span>
        ),
      width: '220px',
    },
    {
      name: 'Title',
      selector: (row) => row?.title,
    },
    {
      name: 'Due Time',
      selector: (row) => {
        const time = moment(row.dueDateAndTime);
        const displayCutoff = time.tz(moment.tz.guess()).format('hh:mm A');
        return displayCutoff;
      },
    },
    {
      name: 'Created',
      selector: (row) => {
        const time = moment(row.createdAt);
        const displayCutoff = time.tz(moment.tz.guess()).format('YYYY-DD-MM');
        return displayCutoff;
      },
      width: '150px',
    },
    {
      name: 'Status',
      selector: (row) => row && <StatusField status={row.status} />,
    },
    {
      name: 'Action',
      selector: (row) =>
        (row?.status === 'Completed' || row?.status === 'Completed Late') &&
          isAdmin ? (
          <div
            onClick={() => {
              setModalData(row);
              setOpen(!open);
            }}
          >
            <button className="px-3 w-full py-3 text-xs text-white duration-150 rounded-md bg-lightHover hover:bg-primary">
              Need Approval
            </button>
          </div>
        ) : (
          <div
            className="w-[65px] h-[25px] flex items-center justify-between cursor-pointer group"
            onClick={() => {
              setModalData(row);
              setOpen(true);
            }}
          >
            <BsEye className="w-[25px] h-[25px] group-hover:!text-primary transition ease-in-out duration-300" />
            <p className="text-sm font-medium w-[35px] h-[22px] group-hover:!text-primary relative top-[2px] transition ease-in-out duration-300">
              View
            </p>
          </div>
        ),
    },
  ];

  return (
    <div
      className="w-full overflow-hidden relative overflow-x-auto md:overflow-visible mt-[18px] cursor-default default__datatable daily__table"
      id="daily-task-table"
    >
      <div className="user_task_table">
        {/* admin datatable */}
        {isAdmin && (
          <div className="admin_task_table">
            <DataTable
              columns={adminColumn}
              data={sortedTasks
                ?.filter((e: any) => e.status !== 'Approved' && e.status !== 'Approved Late' && e.status !== 'Completed' && e.status !== 'Completed Late')
                .slice(0, 4)}
              progressPending={tasks.get_task_loading}
              progressComponent={<TableLoader />}
              persistTableHead={true}
            />
          </div>
        )}

        {/* user datatable */}
        {!isAdmin && (
          <div className="user_task_table">
            <DataTable
              columns={userColumn}
              data={sortedTasks
                ?.filter((e: any) => e.status !== 'Approved' && e.status !== 'Approved Late' && e.status !== 'Completed' && e.status !== 'Completed Late')
                .slice(0, 4)}
              progressPending={tasks.get_task_loading}
              progressComponent={<TableLoader />}
              persistTableHead={true}
            />
          </div>
        )}
      </div>

      <RowModal {...modalData} open={open} setOpen={setOpen} />
    </div>
  );
};

export default DailyTaskTable;
