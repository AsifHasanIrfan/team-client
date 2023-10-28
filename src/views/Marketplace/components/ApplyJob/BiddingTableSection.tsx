import Button from '@components/Button';
import CrownIcon from '@components/Icons/CrownIcon';
import DgCoinIcon from '@components/Icons/DgCoinIcon';
import TableLoader from '@components/Loaders/TableLoader';
import useApplyProjects from '@hooks/useApplyProjects';
import { useAppSelector } from '@hooks/useRedux';
import { useTimer } from '@hooks/useTimer';
import { biddingTableData } from '@views/Marketplace/constants';
import moment from 'moment';
import { useState, useEffect } from 'react';

import DataTable, { TableColumn } from 'react-data-table-component';
import { AiOutlineInfoCircle } from 'react-icons/ai';

type PropsTypes = {
  getBidAmount: any;
  marketplace: any;
  user: any;
  amount: any;
  setAmount: any;
};

const columns: TableColumn<any>[] = [
  {
    name: 'Live Bidding',
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
];

const BiddingTableSection = ({ getBidAmount, marketplace, user, amount, setAmount }: PropsTypes) => {
  const [showBidInput, setShowBidInput] = useState(false);
  // const [leftDgCoin, setLeftDgCoin] = useState(0)
  const [isBidding, setIsBidding] = useState(false)
  const [biddingPosition, setBiddingPosition] = useState([]);

  const { auth } = useAppSelector((state) => state);
  const { applyProjects, applyProjectsLoading } = useApplyProjects(
    auth?.token,
    `marketplaceId=${marketplace?._id}`
  );

  const handleSubmit = () => {
    if (amount) {
      getBidAmount(parseInt(amount));
      setIsBidding(true);
    }
  };

  // sorting data by dg coin
  useEffect(() => {
    setBiddingPosition(
      applyProjects?.datas?.sort(function (a: any, b: any) {
        return b.biddingAmount - a.biddingAmount;
      })
    );
  }, [applyProjects?.datas]);

  // useEffect(() => {
  //   setLeftDgCoin(user?.user?.dgCoin);
  // }, [user?.user])
  const parseAmount = amount === '' ? 0 : parseInt(amount);
  const leftDgCoin = user?.user?.dgCoin - parseAmount;
  const { days, hours, minutes, seconds, isExpired } = useTimer(marketplace?.expiredDate);

  return (
    <div className="pt-[40px] md:w-[60%]">
      <div className="bg-[#1D1D1D] w-full py-[12px] text-center rounded-[10px] mb-[15px]">
        <span className="font-[700] text-white text-[18px]">
          {isExpired
            ? 'Time has expired'
            : `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`}
        </span>
      </div>
      <DataTable
        columns={columns}
        data={biddingPosition?.slice(0, 3)}
        progressPending={applyProjectsLoading}
        progressComponent={<TableLoader />}
        persistTableHead={true}
      />
      <div className="text-[#454545] flex items-center gap-[5px] py-[20px]">
        <i className="text-[20px] text-[#292D32]">
          <AiOutlineInfoCircle />
        </i>
        <p className="text-[14px] relative top-[1px]">
          NOTE: If you place a new bid, Your previously spent DG coin will not
          be refunded.
        </p>
      </div>
      <div>
        {isBidding && (
          <div className="flex justify-between mb-4 border px-7 rounded py-3 bg-white">
            <span>(you)</span>
            <span>Spent {amount} DG coin</span>
          </div>
        )}
      </div>
      <div>
        {!showBidInput && !isBidding && (
          <button
            type="button"
            className="border bg-white border-primary py-[10px] px-[25px] rounded-[8px] font-[600] text-[18px] text-[#454545] hover:text-lightHover hover:border-lightHover"
            onClick={() => setShowBidInput(true)}
          >
            + Set your bid
          </button>
        )}
        {showBidInput && (
          <div className="md:flex items-center gap-[15px]">
            <div className="relative md:w-[330px] w-full">
              <input
                type="number"
                className="bg-white outline-none py-[10px] px-[20px] border border-[#E0E0E0] w-full rounded-[8px] focus:border-lightHover"
                autoFocus={true}
                min={0}
                name="bid"
                placeholder="Enter Bid"
                onChange={(e: any) => {
                  setAmount(e.target.value);
                  // setLeftDgCoin(user?.user?.dgCoin - parseInt(amount));
                }}
              />
              <span className="font-[400] text-[16px] text-[#949494] absolute right-3 top-[50%] translate-y-[-50%] select-none">
                ({leftDgCoin} coin left)
              </span>
            </div>
            <div className="md:pt-0 pt-[15px]">
              <Button
                type="button"
                onClick={() => {
                  handleSubmit();
                  setShowBidInput(false);
                }}
                rounded="md"
                className="py-2.5"
                disabled={amount <= 0 || user?.user?.dgCoin < amount}
              >
                Place bid
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BiddingTableSection;
