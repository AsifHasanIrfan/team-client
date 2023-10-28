import TableLoader from '@components/Loaders/TableLoader';
import TableButton from '@components/TableButton';
import ForgetPasswordModal from '@views/Requests/partials/ForgetPasswordModal';
import TableTitle from '@views/Requests/partials/TableTitle';
import TaskStatus from '@views/TimeOff/components/BottomSection/TableSection/Fields/TaskStatus';
import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

type Props = {
  forget_request_datas: any;
  token: any;
  filterBy: any;
  setFilterBy: any;
  value: any;
  setValue: any;
  loading: any;
};

const PasswordRequest = ({ forget_request_datas, token, filterBy, setFilterBy, value, setValue, loading }: Props) => {

  // states
  const [open, setOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState(forget_request_datas[0] || '');

  // columns
  const columns: TableColumn<any>[] = [
    {
      name: 'Username',
      selector: (row) => row?.username,
    },
    {
      name: 'Email',
      selector: (row) => row?.email,
    },
    {
      name: 'Status',
      selector: (row) => row && row && <TaskStatus status={row.status} />,
    },
    {
      name: 'Action',
      cell: (row) => <TableButton data={row} setOpen={setOpen} setModalData={setModalData} />,
    },
  ];

  return (
    <>

      <TableTitle
        pageTitle='Forget Password'
        setFilterBy={setFilterBy}
        filterBy={filterBy}
        value={value}
        setValue={setValue}
        isSearchFieldRequired={true}
        isFilterTabRequired={true}
      />

      <div className="passwordRequest__table">
        {/*======================= table =========================================*/}
        <DataTable
          columns={columns}
          data={forget_request_datas}
          progressPending={!token || loading}
          progressComponent={<TableLoader />}
          persistTableHead={true}
        />
        {/*======================= table =========================================*/}
      </div>

      <ForgetPasswordModal
        data={modalData}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
};

export default PasswordRequest;
