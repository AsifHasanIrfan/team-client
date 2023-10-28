import React from 'react';
import CardHeader from '@views/Dashboard/partials/CardHeader';
import TableLoader from '@components/Loaders/TableLoader';
import DataTable, { TableColumn } from 'react-data-table-component';
import useDrawbacks from '@hooks/useDrawbacks';
import Image from 'next/image';
import moment from 'moment-timezone';
import DgCoinFull from '@components/Icons/DGCoinFull';

type Props = {
  token: any;
  userId: any;
}

const DashboardDrawBacks = ({ token, userId }: Props) => {

  // hooks
  const { drawbacks, drawbacksLoading } = useDrawbacks(token, userId);

  // columns
  const columns: TableColumn<any>[] = [
    {
      name: 'Drawback Type',
      selector: (row) => row &&
        <div className='flex items-center'>
          <Image
            src={row.title.toLowerCase() === 'no work' ? '/images/drawbacks/brief.svg' : row.title.toLowerCase() === 'missed day' ? '/images/drawbacks/calender.svg' : row.title.toLowerCase() === 'leave early' ? '/images/drawbacks/leave-work.svg' : row.title.toLowerCase() === 'late meeting' ? '/images/drawbacks/clock.svg' : row.title.toLowerCase() === 'not completed 8 hours' ? '/images/drawbacks/not-completed.svg' : '/images/drawbacks/other.svg'}
            alt="drawback"
            width={22}
            height={22}
          />
          <p className="ml-2">{row?.title}</p>
        </div>,
    },
    {
      name: 'Date',
      selector: (row) => {
        const time = moment(row?.createdAt);
        const displayCutoff = time.tz(moment.tz.guess()).format('YYYY-DD-MM');
        return displayCutoff;
      },
    },
    {
      name: 'Amount',
      selector: (row) => row?.amount,
      cell: (row) => <span className="text-primary flex items-center gap-[2px]"> - {" "}
        {row?.type === 'by-dollar' ? '$' : <><span className='w-[15px]'><DgCoinFull /></span></>}
        {row?.drawback}
      </span>,
      center: true,
    },

  ];

  return (
    <div className="bg-white rounded-[20px] pb-[30px] w-full h-fit drawback__Dashboard_datatable">
      <CardHeader title="Drawbacks" link="dashboard/salary" />
      <DataTable
        columns={columns}
        data={drawbacks?.user?.drawbacks}
        progressPending={drawbacksLoading}
        progressComponent={<TableLoader />}
        persistTableHead={true}
      />
    </div>
  );
};

export default DashboardDrawBacks;
