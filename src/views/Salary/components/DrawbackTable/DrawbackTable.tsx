import DgCoinFull from '@components/Icons/DGCoinFull';
import DgCoinIcon from '@components/Icons/DgCoinIcon';
import TableLoader from '@components/Loaders/TableLoader';
import useDrawbacks from '@hooks/useDrawbacks';
import { useAppSelector } from '@hooks/useRedux';
import DgCoin from '@views/UserProfile/components/UserCardsInfo/DgCoin/DgCoin';
import moment from 'moment-timezone';
import Image from 'next/image';
import React, { useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import { BsEye } from 'react-icons/bs';
import DrawbackViewModal from './DrawbackViewModal';

type Props = {}

const DrawbackTable = (props: Props) => {

  // global states
  const { auth, socket } = useAppSelector((state) => state);

  // hooks
  const { drawbacks, drawbacksLoading } = useDrawbacks(auth?.token, auth?.user?._id);

  // states
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(drawbacks?.user?.drawbacks[0]);

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
      width: '200px'
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
    {
      name: 'View',
      selector: (row) =>
        row && (
          <button
            type="button"
            onClick={() => {
              setModalData(row);
              setOpen(true);
            }}
          >
            <span className="flex items-center gap-[9px] group">
              <BsEye className="w-[25px] group-hover:text-primary h-[22px]" />
              <span className="text-[14px] group-hover:text-primary font-medium">
                View
              </span>
            </span>
          </button>
        ),
    },
  ];

  return (<>
    <div className="cursor-default drawback__datatable">
      {/*======================= table =========================================*/}
      <DataTable
        columns={columns}
        data={drawbacks?.user?.drawbacks}
        progressPending={drawbacksLoading}
        progressComponent={<TableLoader />}
        persistTableHead={true}
      />
      {/*======================= table =========================================*/}
    </div>

    <DrawbackViewModal open={open} setOpen={setOpen} data={modalData} />
  </>)
}

export default DrawbackTable