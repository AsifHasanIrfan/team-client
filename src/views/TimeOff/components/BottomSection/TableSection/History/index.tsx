import TableLoader from '@components/Loaders/TableLoader';
import { GetTimeoffAPIRequestDataTypeProp } from '@config/types';
import { getTimeDiff } from '@hooks/helpers';
import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import TaskStatus from '../Fields/TaskStatus';
import SectionHeader from '../SectionHeader/SectionHeader';

type Props = {
  token: string;
  datas: GetTimeoffAPIRequestDataTypeProp[];
  loading: boolean;
}

const Upcoming: React.FC<Props> = ({ token, datas, loading }) => {

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
  ];

  return (
    <div className="w-full h-max rounded-[10px] bg-[#FFFFFF] px-5 timeoff-shadow history-table">
      <SectionHeader title={'History'} />

      {/*======================= table =========================================*/}
      <DataTable
        columns={columns}
        data={datas}
        progressPending={!token || loading}
        progressComponent={<TableLoader />}
        persistTableHead={true}
      />
      {/*======================= table =========================================*/}

      {/* <HistoryTable /> */}
    </div>
  );
};
export default Upcoming;
