import CrownIcon from '@components/Icons/CrownIcon';
import DgCoinIcon from '@components/Icons/DgCoinIcon';
import TableLoader from '@components/Loaders/TableLoader';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BsEye } from 'react-icons/bs';
import ViewModal from './ViewModal';

const BidedTable = ({ applyProjects, applyProjectsLoading }: any) => {
  // states
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [biddingPosition, setBiddingPosition] = useState([]);

  // sorting data by dg coin
  useEffect(() => {
    setBiddingPosition(
      applyProjects?.datas?.sort(function (a: any, b: any) {
        return b.biddingAmount - a.biddingAmount;
      })
    );
  }, [applyProjects]);

  // columns
  const columns: TableColumn<any>[] = [
    {
      name: 'Place',
      cell: (row, index: any) => {
        if (index === 0) {
          return (
            <span className="flex gap-2 font-semibold text-base items-center">
              <CrownIcon />
              1st place
            </span>
          );
        } else if (index === 1) {
          return (
            <span className="flex gap-2 font-medium text-base items-center text-[#6D6D6D]">
              2nd place
            </span>
          );
        } else {
          return (
            <span className="flex gap-2 font-medium text-base items-center text-[#6D6D6D]">
              3nd place
            </span>
          );
        }
      },
    },
    {
      name: 'Name',
      selector: (row) =>
        row && (
          <span>
            {row.user.firstName} {row.user.lastName}
          </span>
        ),
    },
    {
      name: 'Bidding Amount',
      selector: (row, index) =>
        row && (
          <span
            className={`flex items-center gap-2 text-lightHover ${
              index === 0 && 'font-semibold'
            }`}
          >
            <DgCoinIcon />
            {row.biddingAmount}
          </span>
        ),
    },
    {
      name: 'Time',
      selector: (row) => row && <span>{moment(row.createdAt).fromNow()}</span>,
    },
    {
      name: 'Action',
      selector: (row) => (
        <div
          onClick={() => {
            setModalData(row);
            setOpen(true);
          }}
          className="w-[65px] h-[25px] flex items-center justify-between cursor-pointer group"
        >
          <BsEye className="w-[25px] h-[25px] group-hover:!text-primary transition ease-in-out duration-300" />
          <p className="text-sm font-medium w-[35px] h-[22px] group-hover:!text-primary transition ease-in-out duration-300 relative top-[2px]">
            View
          </p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={biddingPosition?.slice(0, 3)}
        progressPending={applyProjectsLoading}
        progressComponent={<TableLoader />}
        persistTableHead={true}
      />

      <ViewModal open={open} setOpen={setOpen} modalData={modalData} />
    </div>
  );
};

export default BidedTable;
