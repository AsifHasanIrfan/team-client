import TableLoader from '@components/Loaders/TableLoader';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BsEye } from 'react-icons/bs';
import StatusField from '../StatusFiled/StatusField';
import RowModal from './RowModal';
import dayjs from 'dayjs';

type Props = {
  datas: any;
  isAdmin: any;
  loading: boolean;
  filterValueTab: string;
  searchByTitle: string;
  searchByDes: string;
  searchByUsername: string;
  filterDropdownValue: string;
  sortByDate: any;
};

const TaskTable = ({
  datas,
  loading,
  filterValueTab,
  isAdmin,
  searchByDes,
  searchByTitle,
  searchByUsername,
  filterDropdownValue,
  sortByDate
}: Props) => {
  // states
  const [open, setOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState(datas[0]);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (filterValueTab) {
      const getFilterData =
        filterValueTab === 'daily'
          ? datas?.filter((el: any) => el.status !== 'Approved' && el.status !== 'Approved Late' && el.status !== 'Completed' && el.status !== 'Completed Late')
          : filterValueTab === 'Completed' ? datas?.filter((el: any) => (el.status === filterValueTab || el.status === 'Completed Late')) : datas?.filter((el: any) => el.status === filterValueTab);
      if (searchByTitle) {
        setFilterData(
          getFilterData.filter((el: any) =>
            el.title
              .toLowerCase()
              .match(new RegExp(searchByTitle.toLowerCase(), 'i'))
          )
        );
      } else if (searchByDes) {
        setFilterData(
          getFilterData.filter((el: any) =>
            el.description
              .toLowerCase()
              .match(new RegExp(searchByDes.toLowerCase(), 'i'))
          )
        );
      } else if (searchByUsername) {
        setFilterData(
          getFilterData.filter((el: any) =>
            (
              el?.worker?.firstName.toLowerCase() +
              ' ' +
              el?.worker?.lastName.toLowerCase()
            ).match(new RegExp(searchByUsername.toLowerCase(), 'i'))
          )
        );
      } else if (filterDropdownValue) {
        setFilterData(getFilterData.filter((el: any) => el.status === filterDropdownValue));
      } else if (sortByDate) {
        setFilterData(getFilterData.filter((el: any) => dayjs(el.dueDateAndTime).format('DD-MM-YYYY').toString() === sortByDate));
      } else {
        setFilterData(getFilterData);
      }
    } else {
      if (searchByTitle) {
        setFilterData(
          datas.filter((el: any) =>
            el.title
              .toLowerCase()
              .match(new RegExp(searchByTitle.toLowerCase(), 'i'))
          )
        );
      } else if (searchByUsername) {
        setFilterData(
          datas.filter((el: any) =>
            (
              el?.worker?.firstName.toLowerCase() +
              ' ' +
              el?.worker?.lastName.toLowerCase()
            ).match(new RegExp(searchByUsername.toLowerCase(), 'i'))
          )
        );
      } else if (searchByDes) {
        setFilterData(
          datas.filter((el: any) =>
            el.description
              .toLowerCase()
              .match(new RegExp(searchByDes.toLowerCase(), 'i'))
          )
        );
      } else if (filterDropdownValue) {
        setFilterData(datas.filter((el: any) => el.status === filterDropdownValue));
      } else if (sortByDate) {
        setFilterData(datas.filter((el: any) => dayjs(el.dueDateAndTime).format('DD-MM-YYYY').toString() === sortByDate));
      } else {
        setFilterData(datas);
      }
    }
  }, [
    filterValueTab,
    datas,
    searchByDes,
    searchByTitle,
    filterDropdownValue,
    searchByUsername,
    sortByDate
  ]);

  // columns
  const userColumn: TableColumn<any>[] = [
    {
      name: 'Title',
      selector: (row) => row && <span title={row?.title}>{row?.title}</span>,
      width: '300px'
    },
    {
      name: 'Due Date',
      selector: (row) => {
        const time = moment(row.dueDateAndTime);
        const displayCutoff = time.tz(moment.tz.guess()).format('YYYY-DD-MM');
        return displayCutoff;
      },
      width: '150px',
    },
    {
      name: 'Due Time',
      selector: (row) => {
        const time = moment(row.dueDateAndTime);
        const displayCutoff = time.tz(moment.tz.guess()).format('hh:mm A');
        return displayCutoff;
      },
      width: '150px',
    },
    {
      name: 'Date',
      selector: (row) => {
        const time = moment(row.createdAt);
        const displayCutoff = time.tz(moment.tz.guess()).format('YYYY-DD-MM');
        return displayCutoff;
      },
      width: '150px',
    },
    {
      name: 'Description',
      selector: (row) => row?.description,
      width: '300px'
    },
    {
      name: 'Status',
      selector: (row) => row && <StatusField status={row.status} />,
      width: '250px'
    },
    {
      name: 'Action',
      selector: (row) => row && (
        <div
          className="w-[65px] h-[25px] flex items-center justify-between cursor-pointer group"
          onClick={() => {
            setModalData(row);
            setOpen(true);
          }}
        >
          <BsEye className="w-[25px] h-[25px] group-hover:!text-primary transition ease-in-out duration-300" />
          <p className="text-sm font-medium w-[35px] h-[22px] group-hover:!text-primary transition ease-in-out duration-300 relative top-[2px]">
            View
          </p>
        </div>
      ),
      width: '150px',
    },
  ];

  // columns
  const adminColumn: TableColumn<any>[] = [
    {
      name: 'Full Name',
      selector: (row) => row?.worker?.firstName + ' ' + row?.worker?.lastName,
      width: '250px',
    },
    {
      name: 'Title',
      selector: (row) => row?.title,
    },
    {
      name: 'Due Time',
      selector: (row) => {
        const time = moment(row.dueDateAndTime);
        const displayCutoff = time.tz(moment.tz.guess()).format('hh:mm A');
        return displayCutoff;
      },
    },
    {
      name: 'Created',
      selector: (row) => {
        const time = moment(row.createdAt);
        const displayCutoff = time.tz(moment.tz.guess()).format('YYYY-DD-MM');
        return displayCutoff;
      },
      width: '150px',
    },
    {
      name: 'Status',
      selector: (row) => row && <StatusField status={row.status} />,
    },
    {
      name: 'Action',
      selector: (row) =>
        (row?.status === 'Completed' || row?.status === 'Completed Late') &&
          isAdmin ? (
          <div
            onClick={() => {
              setOpen(!open);
              setModalData(row);
            }}
          >
            <button className="px-3 w-full py-3 text-xs text-white duration-150 rounded-md bg-lightHover hover:bg-primary">
              Need Approval
            </button>
          </div>
        ) : (
          <div
            className="w-[65px] h-[25px] flex items-center justify-between cursor-pointer group"
            onClick={() => {
              setModalData(row);
              setOpen(true);
            }}
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
    <>
      {/* admin datatable */}
      {isAdmin && (
        <div className="admin_task_table">
          <DataTable
            columns={adminColumn}
            data={filterData}
            progressPending={loading}
            progressComponent={<TableLoader />}
            persistTableHead={true}
          />
        </div>
      )}

      {/* user datatable */}
      {!isAdmin && (
        <div className="user_task_table">
          <DataTable
            columns={userColumn}
            data={filterData}
            progressPending={loading}
            progressComponent={<TableLoader />}
            persistTableHead={true}
          />
        </div>
      )}

      <RowModal {...modalData} open={open} setOpen={setOpen} />
    </>
  );
};

export default TaskTable;
