// external import
import TableLoader from '@components/Loaders/TableLoader';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import useUser from '@hooks/useUser';
import { createNotification } from '@redux/actions/notification';
import ViewLess from '@views/UserProfile/partials/ViewLess';
import axios from 'axios';
import moment from 'moment-timezone';
import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { toast } from 'react-hot-toast';
import { FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const DgCoinHistory = ({ datas, loading, dgsFetch, token, userId }: any) => {

  // global states
  const dispatch = useAppDispatch();
  const { socket } = useAppSelector((state) => state);

  // hooks
  const { userFetch } = useUser(token, userId as string);

  const [dLoding, setDLoading] = useState(false);

  const handleDGDelete = (drId: any, dgAmount: any) => {
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
        axios.post(`${process.env.serverUrl}dg-delete/${drId}`, { userId }, {
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
              dgsFetch();
              userFetch();
              const notifyData = {
                recipients: [userId],
                url: '/dashboard/rewards',
                // @ts-ignore
                content: `Your ${dgAmount} DG Coin removed`,
              };

              dispatch(createNotification(notifyData, token, socket));
              toast.success(response.data.message);
            }
          });
      }
    })
  }

  // columns
  const columns: TableColumn<any>[] = [
    {
      name: 'DG Title',
      selector: (row) => row && <span title={row?.title}>{row?.title}</span>,
      width: '150px'
    },
    {
      name: 'Date',
      selector: (row) => {
        const time = moment(row?.createdAt);
        const displayCutoff = time.tz(moment.tz.guess()).format('DD-MM-YYYY');
        return displayCutoff;
      },
      width: '105px'
    },
    {
      name: 'Current EMP',
      selector: (row) => row.isCountForEMP ? 'Yes' : 'No',
      center: true
    },
    {
      name: 'Coin',
      selector: (row) => row?.amount,
      center: true
    },
    {
      name: 'Action',
      selector: (row) => row && <button
        type='button'
        onClick={() => handleDGDelete(row._id, row?.amount)}
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
        data={datas}
        progressPending={loading || dLoding}
        progressComponent={<TableLoader />}
        persistTableHead={true}
      />
      {/*======================= table =========================================*/}
    </div>
  );
};
export default DgCoinHistory;
