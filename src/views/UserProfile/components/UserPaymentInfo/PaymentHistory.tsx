// external import
import React from 'react';

//internal import
import DataTable, { TableColumn } from 'react-data-table-component';
import dayjs from 'dayjs';
import TableLoader from '@components/Loaders/TableLoader';

const SalaryHistory = ({ tableData, loading }: { tableData?: any; loading: any; }) => {

  const columns: TableColumn<any>[] = [
    {
      name: 'Amount',
      selector: (row) => row && <span>${row?.salary}</span>,
    },
    {
      name: 'Date',
      selector: (row) => dayjs(row?.createdAt).format('MM-DD-YYYY'),
    },
  ];

  return (
    <div className='mt-3 cursor-default'>
      {/*======================= table =========================================*/}
      <DataTable
        columns={columns}
        data={tableData}
        progressPending={loading}
        progressComponent={<TableLoader />}
        persistTableHead={true}
      />
      {/*======================= table =========================================*/}
    </div>
  );
};
export default SalaryHistory;
