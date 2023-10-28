import TableLoader from '@components/Loaders/TableLoader';
import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(timezone);
dayjs.extend(utc);

// Attendance data types
type Props = {
  data: any;
  loading: boolean;
};

const AttendanceTable = ({ data, loading }: Props) => {

  // Attendance columns 
  const attendanceColumns: TableColumn<any>[] = [
    {
      name: 'user',
      cell: (row) =>
        row && (
          <span>
            {row?.user?.firstName} {row?.user?.firstName}
          </span>
        ),
      width: '300px',
    },
    {
      name: 'Attendance',
      cell: (row) =>
        row && (
          <span>
            {row?.isPresent && "P"}
          </span>
        ),
    },
    {
      name: 'Date',
      cell: (row) => {
        const time = dayjs(row?.createdAt)
        const formetTime = dayjs
          .tz(time, 'America/New_York')
          .format('MMM-DD-YYYY');
        return formetTime;
      }
    },
    {
      name: 'Time',
      cell: (row) => {
        const time = dayjs(row?.createdAt)
        const formetTime = dayjs
          .tz(time, 'America/New_York')
          .format('hh:mm A');
        return formetTime;
      }
    },
  ];

  return (
    <>
      <DataTable
        columns={attendanceColumns}
        data={data}
        progressPending={loading}
        progressComponent={<TableLoader />}
        persistTableHead={true}
      />
    </>
  );
};

export default AttendanceTable;