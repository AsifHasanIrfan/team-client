import TableLoader from '@components/Loaders/TableLoader';
import useBenefitHistory from '@hooks/useBenefitHistory';
import { useAppSelector } from '@hooks/useRedux';
import axios from 'axios';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { toast } from 'react-hot-toast';
import { MdOutlinePersonRemoveAlt1 } from 'react-icons/md';
import Swal from 'sweetalert2';

const PurchaseHistory = () => {
  const [filterBy, setFilterBy] = useState('current');
  const [filteredHistory, setFilteredHistory] = useState([]);

  // global states
  const { auth } = useAppSelector((state) => state);

  // hooks
  const { benefitHistories, benefitHistoriesLoading, benefitHistoriesFetch } = useBenefitHistory(auth?.token);

  useEffect(() => {
    if (filterBy === 'current') {
      const currentBenefitHistory = benefitHistories?.datas?.filter(
        (benefitHistory: any) => benefitHistory.current === true
      );
      setFilteredHistory(currentBenefitHistory);
    } else {
      const archiveBenefitHistory = benefitHistories?.datas?.filter(
        (benefitHistory: any) => benefitHistory.current === false
      );
      setFilteredHistory(archiveBenefitHistory);
    }
  }, [benefitHistories?.datas, filterBy]);

  const handleRemoveUser = (row: any) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to remove this user!`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#C10206',
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        const historyData = {
          benefitId: row.benefitId,
          userId: row.userId,
        };
        axios
          .put(
            `${process.env.serverUrl}benefit/remove/histories/${row._id}`,
            historyData,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.token}`,
              },
            }
          )
          .then((response) => {
            if (response.data.success === false) {
              return toast.error(response.data.message);
            }
            if (response.data.success === true) {
              benefitHistoriesFetch();
              toast.success(response.data.message);
            }
          });
      }
    });
  };

  // Table columns
  const columns: TableColumn<any>[] = [
    {
      name: 'Username',
      selector: (row) => row?.username,
    },
    {
      name: 'Benefit Title',
      selector: (row) => row?.benefitTitle,
    },
    {
      name: 'Purchase Date',
      selector: (row) => {
        const time = moment(row?.createdAt);
        const displayCutoff = time
          .tz(moment.tz.guess())
          .format('MMM DD YYYY  hh:mm:A');
        return displayCutoff;
      },
    },
    {
      name: 'Action',
      cell: (row) => (
        <span
          onClick={() => handleRemoveUser(row)}
          className="flex items-center justify-center gap-3 cursor-pointer hover:text-primary duration-300"
        >
          <MdOutlinePersonRemoveAlt1 /> Unassign
        </span>
      ),
    },
  ];

  // Table columns
  const archiveColumns: TableColumn<any>[] = [
    {
      name: 'Username',
      selector: (row) => row?.username,
    },
    {
      name: 'Benefit Title',
      selector: (row) => row?.benefitTitle,
    },
    {
      name: 'Purchase Date',
      selector: (row) => {
        const time = moment(row?.createdAt);
        const displayCutoff = time.tz(moment.tz.guess()).format('MMM DD YYYY  hh:mm:A');
        return displayCutoff;
      },
    }
  ];

  return (
    <div className="px-5 py-[18px] rounded-[20px] bg-[#FFFFFF]">
      <div className="w-full flex md:flex-row flex-col md:items-center md:gap-5 gap-1 py-5">
        <h2 className="md:text-[24px] text-[16px] font-medium leading-[34px]">
          Purchase History
        </h2>

        <div className="flex gap-[20px]">
          <button
            type="button"
            onClick={() => setFilterBy('current')}
            className={`md:text-[20px] text-[16px] outline-none font-medium text-[#CCCCCC] hover:text-primary transition ease-in-out duration-300 ${filterBy === 'current' && '!text-primary'
              } }`}
          >
            Current
          </button>
          <button
            type="button"
            onClick={() => setFilterBy('archived')}
            className={`md:text-[20px] text-[16px] outline-none font-medium text-[#CCCCCC] hover:text-primary transition ease-in-out duration-300 ${filterBy === 'archived' && '!text-primary'
              } }`}
          >
            Archived
          </button>
        </div>
      </div>

      <DataTable
        columns={filterBy === 'current' ? columns : archiveColumns}
        data={filteredHistory}
        progressPending={benefitHistoriesLoading}
        progressComponent={<TableLoader />}
        persistTableHead={true}
      />
    </div>
  );
};

export default PurchaseHistory;
