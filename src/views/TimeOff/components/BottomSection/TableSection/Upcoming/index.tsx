import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import SectionHeader from '../SectionHeader/SectionHeader';
import { FaRegTrashAlt } from 'react-icons/fa'
import TaskStatus from '../Fields/TaskStatus';
import TableLoader from '@components/Loaders/TableLoader';
import { GetTimeoffAPIRequestDataTypeProp } from '@config/types';
import { getTimeDiff } from '@hooks/helpers';

type Props = {
  token: string;
  datas: GetTimeoffAPIRequestDataTypeProp[];
  handleDeleteTimeoff: any;
  role: string;
  loading: boolean;
}

const Upcoming: React.FC<Props> = ({ token, role, datas, handleDeleteTimeoff, loading }) => {

  // columns
  const columns: TableColumn<any>[] = [
    {
      name: 'Start Date',
      selector: (row) => row?.startDate,
    },
    {
      name: 'End Date',
      selector: (row) => row?.endDate ? row.endDate : 'n/a',
    },
    {
      name: 'Type',
      selector: (row) => row?.type,
    },
    {
      name: 'Total Time',
      selector: (row) => (row?.startDate && row?.endDate) ? getTimeDiff(new Date(row?.startDate), new Date(row?.endDate), true) : row?.lateTime ? row?.lateTime : <span className='ml-1'>n/a</span>,
    },
    {
      name: 'Status',
      selector: (row) => row && <TaskStatus status={row.status} />,
    },
    {
      name: 'Action',
      selector: (row) => row && <button
        type='button'
        title={new Date(row.startDate).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0) ? `Today's data can't be delete!` : undefined}
        onClick={() => handleDeleteTimeoff(row._id, row.startDate)}
        className={`text-[20px] pl-2 hover:text-primary outline-none disabled:text-gray-400 transition ease-in-out duration-300`}
        disabled={new Date(row.startDate).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0)}
      >
        <FaRegTrashAlt />
      </button>,
      center: true,
      width: '140px'
    },
  ];

  return (
    <div className="w-full h-max rounded-[10px] bg-[#FFFFFF] px-5 timeoff-shadow timeoff-table">
      <SectionHeader title={'Upcoming'} />

      {/*======================= table =========================================*/}
      <DataTable
        columns={columns}
        data={datas}
        progressPending={!token || loading}
        progressComponent={<TableLoader />}
        persistTableHead={true}
      />
      {/*======================= table =========================================*/}


      {/* <UpcomingTable /> */}
    </div>
  );
};
export default Upcoming;
