import TableLoader from '@components/Loaders/TableLoader';
import { cx } from '@config/constants';
import useJobs from '@hooks/useJobs';
import { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BsEye } from 'react-icons/bs';
import ViewJobModal from '../ViewJobModal';

type Props = {
  token: string;
};

const JobDataTable = ({ token }: Props) => {
  // hooks
  const { jobs, jobsLoading } = useJobs(token);

  // states
  const [modalData, setModalData] = useState(jobs?.datas[0]);
  const [openView, setViewOpen] = useState(false);

  // columns
  const columns: TableColumn<any>[] = [
    {
      name: 'Title',
      selector: (row) => row && <span title={row?.title}>{row?.title}</span>,
    },
    {
      name: 'Open Position',
      selector: (row) => row?.openPostiton,
    },
    {
      name: 'Category',
      selector: (row) =>
        row && <span className="capitalize">{row?.category}</span>,
    },
    {
      name: 'Status',
      selector: (row) =>
        row && (
          <div
            className={cx(
              'flex items-center justify-center w-[90px] rounded-[5px] cursor-default',
              row.status === 'active' && 'bg-[#21B9791A]',
              row.status === 'inactive' && 'bg-[#FF00001A]'
            )}
          >
            <p
              className={cx(
                'text-[#2D2B2B] text-center rounded-[6px] px-[15px] py-2  text-sm leading-5 capitalize ',
                row.status === 'active' && '!text-[#21B979]',
                row.status === 'inactive' && '!text-[#FF0000]'
              )}
            >
              {row.status}
            </p>
          </div>
        ),
    },
    {
      name: 'Action',
      cell: (row) => (
        <button
          type="button"
          className="group"
          onClick={() => {
            setModalData(row);
            setViewOpen(true);
          }}
        >
          <span className="flex items-center gap-[9px] text-[16px]">
            <BsEye className="group-hover:text-primary text-[22px]" />
            <span className="text-[16px] font-medium group-hover:text-primary">
              View
            </span>
          </span>
        </button>
      ),
    },
  ];

  return (
    <>
      {/*======================= table =========================================*/}
      <div className="job__table cursor-default">
        <DataTable
          columns={columns}
          data={jobs?.datas}
          progressPending={jobsLoading}
          progressComponent={<TableLoader />}
          persistTableHead={true}
        />
      </div>
      {/*======================= table =========================================*/}

      <ViewJobModal
        openView={openView}
        setViewOpen={setViewOpen}
        data={modalData}
        token={token}
      />
    </>
  );
};

export default JobDataTable;
