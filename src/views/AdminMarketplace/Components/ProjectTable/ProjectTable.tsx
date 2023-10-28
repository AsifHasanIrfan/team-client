import TableLoader from '@components/Loaders/TableLoader';
import moment from 'moment';
import Link from 'next/link';
import { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BsEye } from 'react-icons/bs';
import HighestBidder from '../HighestBidder/HighestBidder';
import Member from '../Member/Member';

type Props = {
  data: any;
  token: any;
  loading: boolean;
  tabValue: string;
};

const ProjectTable = ({ data, loading, tabValue, token }: Props) => {
  // states
  const [open, setOpen] = useState<boolean>(false);
  const [filterData, setFilterData] = useState([]);

  // columns
  const otherColumns: TableColumn<any>[] = [
    {
      name: 'Project Name',
      selector: (row) => row?.title,
    },
    {
      name: 'Budget',
      selector: (row) => row && <span>${row.budget}</span>,
    },
    {
      name: 'Member',
      selector: (row) =>
        row && <Member
          data={row}
          token={token}
        />,
    },
    {
      name: 'Time',
      selector: (row) =>
        row && <span>Posted {moment(row.createdAt).fromNow()}</span>,
    },
    {
      name: 'Action',
      selector: (row) => (
        <Link href={`/dashboard/admin-marketplace/view-project/${row?._id}`}>
          <div className="w-[65px] h-[25px] flex items-center justify-between cursor-pointer group">
            <BsEye className="w-[25px] h-[25px] group-hover:!text-primary transition ease-in-out duration-300" />
            <p className="text-sm font-medium w-[35px] h-[22px] group-hover:!text-primary transition ease-in-out duration-300 relative top-[2px]">
              View
            </p>
          </div>
        </Link>
      ),
    },
  ];

  // columns
  const postedColumns: TableColumn<any>[] = [
    {
      name: 'Project Name',
      selector: (row) => row?.title,
    },
    {
      name: 'Budget',
      selector: (row) => row && <span>${row.budget}</span>,
    },
    {
      name: 'Highest Bidder',
      selector: (row) =>
        row && <HighestBidder
          data={row}
          token={token}
        />,
    },
    {
      name: 'Time',
      selector: (row) =>
        row && <span>Posted {moment(row.createdAt).fromNow()}</span>,
    },
    {
      name: 'Action',
      selector: (row) => (
        <Link href={`/dashboard/admin-marketplace/view-project/${row?._id}`}>
          <div className="w-[65px] h-[25px] flex items-center justify-between cursor-pointer group">
            <BsEye className="w-[25px] h-[25px] group-hover:!text-primary transition ease-in-out duration-300" />
            <p className="text-sm font-medium w-[35px] h-[22px] group-hover:!text-primary transition ease-in-out duration-300 relative top-[2px]">
              View
            </p>
          </div>
        </Link>
      ),
    },
  ];

  return (
    <>
      <div className="">
        <DataTable
          columns={tabValue === 'Posted Projects' ? postedColumns : otherColumns}
          data={data}
          progressPending={loading}
          progressComponent={<TableLoader />}
          persistTableHead={true}
        />
      </div>
    </>
  );
};

export default ProjectTable;
