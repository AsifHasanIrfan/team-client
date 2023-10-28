import DgCoinFull from '@components/Icons/DGCoinFull';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import TableLoader from '@components/Loaders/TableLoader';
import useApplyProjects from '@hooks/useApplyProjects';
import { useAppSelector } from '@hooks/useRedux';
import ApplyButton from '@views/Marketplace/components/Home/ApplyButton';
import {
  myApplicationTabData,
  tabActiveStyle,
} from '@views/Marketplace/constants';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { BsEye } from 'react-icons/bs';
import MyPosition from './MyPosition';

const MyApplication = () => {
  // global
  const router = useRouter();
  const { auth } = useAppSelector((state) => state);

  // hooks
  const { applyProjects, applyProjectsLoading } = useApplyProjects(
    auth?.token,
    `user=${auth?.user?._id}`
  );

  // states
  const [tab, setTab] = useState(1);
  const [filterData, setFilterData] = useState([]);

  // filtering data
  useEffect(() => {
    if (tab === 1) {
      setFilterData(
        applyProjects?.datas?.filter(
          (item: any) => item?.marketplaceId?.status === 'posted'
        )
      );
    } else if (tab === 2) {
      setFilterData(
        applyProjects?.datas?.filter(
          (item: any) =>
            item?.marketplaceId?.status === 'running' &&
            item.marketplaceId.assignedUser === auth?.user?._id
        )
      );
    } else if (tab === 3) {
      setFilterData(
        applyProjects?.datas?.filter(
          (item: any) =>
            item?.marketplaceId?.status === 'completed' &&
            item.marketplaceId.assignedUser === auth?.user?._id
        )
      );
    } else {
      setFilterData([]);
    }
  }, [tab, applyProjects?.datas, auth?.user?._id]);

  const handleClick = (id: number) => {
    setTab(id);
    router.push('/dashboard/marketplace/my-application');
  };

  const columns: TableColumn<any>[] = [
    {
      name: 'Project Name',
      selector: (row) =>
        row && (
          <span title={row?.marketplaceId.title}>
            {row?.marketplaceId.title}
          </span>
        ),
    },
    {
      name: 'Your Position',
      selector: (row) => row && <MyPosition data={row} token={auth?.token} />,
    },
    {
      name: 'My Bids',
      selector: (row) =>
        row && (
          <span
            title={row?.biddingAmount}
            className="text-primary flex items-center gap-2"
          >
            <span className="w-[22px]">
              <DgCoinFull />
            </span>{' '}
            <span className="relative top-[1px]">{row?.biddingAmount}</span>
          </span>
        ),
    },
    {
      name: 'Time',
      selector: (row) => row && moment(row.createdAt).fromNow(),
    },
    {
      name: 'Action',
      cell: (row) => (
        <button
          type="button"
          className="group"
          onClick={() =>
            router.push(
              `/dashboard/marketplace/details/${row.marketplaceId._id}`
            )
          }
        >
          <span className="flex items-center gap-[9px] text-[16px]">
            <BsEye className="group-hover:text-primary text-[22px]" />
            <span className="text-[16px] font-medium group-hover:text-primary">
              View
            </span>
          </span>
        </button>
      ),
      // center: true,
    },
  ];

  if (!auth.token) return <FullPageLoader />;

  return (
    <div className="myapplication__table">
      <div className="flex items-center justify-between">
        <div className="flex items-center md:gap-[30px] gap-[15px]">
          {myApplicationTabData.map((item) => (
            <span
              key={item.id}
              className={`md:text-[16px] text-[12px] cursor-pointer font-[500] hover:text-lightHover md:pb-[10px] pb-[5px] md:transition-all md:duration-300 ${
                tab === item.id && tabActiveStyle
              }`}
              onClick={() => handleClick(item.id)}
            >
              {item.text}
            </span>
          ))}
        </div>
        <div>
          <ApplyButton
            className="bg-primary text-white hover:bg-lightHover hover:text-white border-none"
            onClick={() => router.push('/dashboard/marketplace')}
          >
            View All Jobs
          </ApplyButton>
        </div>
      </div>
      <div className="py-[50px]">
        <DataTable
          columns={columns}
          data={filterData}
          progressPending={applyProjectsLoading}
          progressComponent={<TableLoader />}
          persistTableHead={true}
        />
      </div>
    </div>
  );
};

export default MyApplication;
