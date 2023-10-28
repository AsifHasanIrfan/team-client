import TableLoader from '@components/Loaders/TableLoader';
import TableButton from '@components/TableButton';
import { getTimeDiff } from '@hooks/helpers';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { timeOffGet } from '@redux/actions/timeoff';
import CreateRequestsModal from '@views/Requests/partials/CreateRequestsModal';
import TableTitle from '@views/Requests/partials/TableTitle';
import TaskStatus from '@views/TimeOff/components/BottomSection/TableSection/Fields/TaskStatus';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BsEye } from 'react-icons/bs';

function RequestsTimeOf({ setTotalTimeoffRequest }: any) {

  // global variable from redux
  const dispatch = useAppDispatch();
  const { auth, timeoff } = useAppSelector(state => state);

  // states
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('')
  const [modalData, setModalData] = useState(timeoff?.timeoff_datas[0]);
  const [filterBy, setFilterBy] = useState('progress');
  const [filterData, setFilterData] = useState([]);
  const [value, setValue] = useState('');

  // get api data
  useEffect(() => {
    if (auth.token) {
      dispatch(timeOffGet(auth.token))
    }
  }, [dispatch, auth.token])

  // set filter data and search
  useEffect(() => {
    const timeoffReqs = timeoff?.timeoff_datas?.filter((item: any) => item.type !== 'Change Off Day')

    setTotalTimeoffRequest(timeoffReqs.filter((item: any) => item.status === 'progress').length)
    if (value) {
      const flDatas = timeoff?.timeoff_datas?.filter((item: any) => item.type !== 'Change Off Day')?.filter((item: any) => item.status === filterBy)
      setFilterData(flDatas.filter((el: any) => (el.user?.username)?.match(new RegExp(value, "i"))));
    } else {
      setFilterData(timeoff?.timeoff_datas?.filter((item: any) => item.type !== 'Change Off Day')?.filter((item: any) => item.status === filterBy))
    }
  }, [value, timeoff.timeoff_datas, filterBy, setTotalTimeoffRequest])

  // columns
  const columns: TableColumn<any>[] = [
    {
      name: 'Username',
      selector: (row) => row?.user?.username,
    },
    {
      name: 'Start Date',
      selector: (row) => row?.startDate,
    },
    {
      name: 'End Date',
      selector: (row) => row?.endDate ? row.endDate : 'n/a',
    },
    {
      name: 'Type',
      selector: (row) => row?.type === 'Medical Emergency' ? 'Sick Days' : row?.type,
    },
    {
      name: 'Date',
      selector: (row) => dayjs(row?.createdAt).format("DD-MM-YYYY hh.mm A"),
    },
    {
      name: 'Total Time',
      selector: (row) => (row?.startDate && row?.endDate) ? getTimeDiff(new Date(row?.startDate), new Date(row?.endDate), true) : row?.lateTime ? row?.lateTime : <span className='ml-1'>n/a</span>,
    },
    {
      name: 'Status',
      selector: (row) => row && <TaskStatus status={row.status} />,
    },
    {
      name: 'Action',
      cell: (row) => <TableButton
        data={row}
        setOpen={setOpen}
        setModalData={setModalData}
        setSelectedUserId={setSelectedUserId}
        request
      />,
    },
  ];

  return (
    <>

      <TableTitle
        pageTitle='Request Timeoff'
        setFilterBy={setFilterBy}
        filterBy={filterBy}
        value={value}
        setValue={setValue}
        isSearchFieldRequired={true}
        isFilterTabRequired={true}
      />

      <div className='timeoff-table request-timeoff-table'>
        {/*======================= table =========================================*/}
        <DataTable
          columns={columns}
          data={filterData}
          progressPending={!auth.token || timeoff.timeoff_get_loading}
          progressComponent={<TableLoader />}
          persistTableHead={true}
        />
        {/*======================= table =========================================*/}
      </div>

      <CreateRequestsModal userId={selectedUserId} data={modalData} open={open} setOpen={setOpen} />
    </>
  );
}

export default RequestsTimeOf;
