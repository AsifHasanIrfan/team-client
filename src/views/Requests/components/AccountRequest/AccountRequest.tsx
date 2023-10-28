import TableLoader from '@components/Loaders/TableLoader';
import TableTitle from '@views/Requests/partials/TableTitle';
import TaskStatus from '@views/TimeOff/components/BottomSection/TableSection/Fields/TaskStatus';
import axios from 'axios';
import { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { toast } from 'react-hot-toast';
import { FaRegTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

type Props = {
  filterData: any;
  requestLoginsLoading: any;
  requestLoginsFetch: any;
  token: any;
  filterBy: any;
  setFilterBy: any;
};

const AccountRequest = ({ filterData, requestLoginsFetch, requestLoginsLoading, token, setFilterBy, filterBy }: Props) => {

  // states
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  // delete timeoff
  const handleAccountReqDelete = (id: any) => {
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

        setLoading(true);
        axios.delete(`${process.env.serverUrl}request-login/${id}`, {
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            setLoading(false);
            if (response.data.success === false) {
              return toast.error(response.data.message);
            }
            if (response.data.success === true) {
              requestLoginsFetch();
              toast.success(response.data.message);
            }
          });
      }
    })
  }

  // columns
  const columns: TableColumn<any>[] = [
    {
      name: 'Username',
      selector: (row) => row.name,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
    },
    {
      name: 'Member Type',
      selector: (row) => row.requestedBy,
    },
    {
      name: 'Status',
      selector: (row) => row && row && <TaskStatus status={row.status} />,
    },
    {
      name: 'Action',
      selector: (row) => row && <button
        type='button'
        onClick={() => handleAccountReqDelete(row._id)}
        className={`text-[20px] pl-2 hover:text-primary outline-none disabled:text-gray-400 transition ease-in-out duration-300`}
      >
        <FaRegTrashAlt />
      </button>,
    },
  ];

  return (
    <>
      <TableTitle
        pageTitle="Account Request"
        setFilterBy={setFilterBy}
        filterBy={filterBy}
        value={value}
        setValue={setValue}
        isSearchFieldRequired={false}
        isFilterTabRequired={false}
      />

      <div>
        {/*======================= table =========================================*/}
        <DataTable
          columns={columns}
          data={filterData}
          progressPending={!token || requestLoginsLoading || loading}
          progressComponent={<TableLoader />}
          persistTableHead={true}
        />
        {/*======================= table =========================================*/}
      </div>
    </>
  );
};

export default AccountRequest;
