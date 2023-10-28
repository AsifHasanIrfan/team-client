// external import
import DgCoinFull from '@components/Icons/DGCoinFull';
import TableLoader from '@components/Loaders/TableLoader';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import useUser from '@hooks/useUser';
import { createNotification } from '@redux/actions/notification';
import axios from 'axios';
import moment from 'moment-timezone';
import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { toast } from 'react-hot-toast';
import { FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
// internal import

type Props = {
  data?: any;
  loading?: any;
  drawbacksFetch?: any;
  token?: any;
  userId?: any;
}

const DrawBackHistory = ({ data, loading, drawbacksFetch, userId, token }: Props) => {

  // global states
  const dispatch = useAppDispatch();
  const { socket } = useAppSelector((state) => state);

  // hooks
  const { userFetch } = useUser(token, userId as string);

  const [dLoding, setDLoading] = useState(false);

  const handleDrawbackDelete = (drId: any, drawbackAmount: any, drawbackType: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#C10206',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        setDLoading(true);
        axios.post(`${process.env.serverUrl}user/drawback-delete/${drId}`, { userId }, {
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        },)
          .then((response) => {
            setDLoading(false);
            if (response.data.success === false) {
              return toast.error(response.data.message);
            }
            if (response.data.success === true) {
              drawbacksFetch();
              userFetch();
              const notifyData = {
                recipients: [userId],
                url: '/dashboard/salary',
                // @ts-ignore
                content: `Your drawback ${drawbackAmount} ${drawbackType === 'by-coin' ? 'coin' : 'dollar'} removed`,
              };

              dispatch(createNotification(notifyData, token, socket));
              toast.success(response.data.message);
            }
          });
      }
    })
  }

  const columns: TableColumn<any>[] = [
    {
      name: 'Drawback Title',
      selector: (row) => row && <span title={row?.title}>{row?.title}</span>,
      width: '130px'
    },
    {
      name: 'Date',
      selector: (row) => {
        const time = moment(row?.createdAt);
        const displayCutoff = time.tz(moment.tz.guess()).format('DD-MM-YYYY');
        return displayCutoff;
      },
    },
    {
      name: 'Amount',
      selector: (row) => row?.drawback,
      cell: (row) => <span className="text-primary flex items-center gap-[2px]"> - {" "}
        {row?.type === 'by-dollar' ? '$' : <><span className='w-[15px]'><DgCoinFull /></span></>}
        {row?.drawback}
      </span>,
      center: true
    },
    {
      name: 'Action',
      selector: (row) => row && <button
        type='button'
        onClick={() => handleDrawbackDelete(row._id, row?.drawback, row?.type)}
        className={`text-[20px] pl-2 hover:text-primary outline-none disabled:text-gray-400 transition ease-in-out duration-300`}
      >
        <FaRegTrashAlt />
      </button>,
      center: true
    },
  ];

  return (
    <div className='mt-3 cursor-default'>
      {/*======================= table =========================================*/}
      <DataTable
        columns={columns}
        data={data}
        progressPending={loading || dLoding}
        progressComponent={<TableLoader />}
        persistTableHead={true}
      />
      {/*======================= table =========================================*/}
    </div>
  );
};
export default DrawBackHistory;
