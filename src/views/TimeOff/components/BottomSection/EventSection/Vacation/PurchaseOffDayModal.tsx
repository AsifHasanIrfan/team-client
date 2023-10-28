import Button from '@components/Button';
import Modal from '@components/Modal';
import useEMP from '@hooks/useTeamMemberOfTheMonth';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: any;
  token: any;
  userFetch: any;
  availableDGCoin: number;
};

const PurchaseOffDayModal = ({
  open,
  setOpen,
  userId,
  token,
  userFetch,
  availableDGCoin,
}: Props) => {

  const coinValue = 1500;

  // hooks
  const { empsFetch } = useEMP(token);

  // states
  const [dayCount, setDayCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState<any>('vacationDays');

  const handleIncrement = () => setDayCount((prev) => (prev += 1));

  const handleDecrement = () => {
    if (dayCount > 1) {
      setDayCount((prev) => (prev -= 1));
    }
  };

  const handleTimeoffDays = async (e: any) => {
    const sendData = {
      type: currentTab,
      totalCost: coinValue * dayCount,
      purchasedDays: dayCount,
    };
    setLoading(true);

    const { data } = await axios.patch(
      `${process.env.serverUrl}/timeoff/purchase/${userId}`,
      sendData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setLoading(false);
    if (data.success === true) {
      userFetch();
      empsFetch();
      toast.success(data.message);
      setOpen(false);
    }

    if (data.success === false) {
      toast.error(data.message);
    }
  };

  return (
    <>
      <Modal setOpen={setOpen} open={open} title={'Purchase off day'}>
        <div className="w-[330px] md:w-[500px] xl:w-[850px] benefit__createModal">
          <h3 className="text-center text-[#1D1D1D] font-medium text-2xl">
            You can buy a total of{' '}
            {availableDGCoin ? Math.floor(availableDGCoin / coinValue) : 0} days
          </h3>

          {/* <div className="flex items-center justify-center my-8">
            <button
              type="button"
              onClick={() => {
                setDayCount(1);
                setCurrentTab('vacationDays');
              }}
              className={`${currentTab === 'vacationDays'
                ? 'bg-[#EA002E] text-white'
                : 'bg-[#dadada] text-black'
                } cursor-pointer py-1.5 w-[120px] text-sm rounded-tl-md rounded-bl-md text-center`}
            >
              Vacation Days
            </button>
            <button
              type="button"
              onClick={() => {
                setDayCount(1);
                setCurrentTab('sickDays');
              }}
              className={`${currentTab === 'sickDays'
                ? 'bg-[#EA002E] text-white'
                : 'bg-[#dadada] text-black'
                } cursor-pointer py-1.5 w-[120px] text-sm rounded-tr-md rounded-br-md text-center`}
            >
              Sick Days
            </button>
          </div> */}

          <div className="flex items-center justify-center my-5 gap-3 pt-3">
            <span
              className="py-[5px] px-[12px] border border-[#ddd] cursor-pointer text-xl"
              onClick={handleDecrement}
            >
              <AiOutlineMinus />
            </span>
            <span className="py-[5px] px-[12px] border border-[#ddd] text-sm font-medium select-none">
              {dayCount} days
            </span>
            <span
              className="py-[5px] px-[12px] border border-[#ddd] cursor-pointer text-xl"
              onClick={handleIncrement}
            >
              <AiOutlinePlus />
            </span>
          </div>

          <div className="flex items-center justify-center my-3 mt-8">
            <Button
              rounded="md"
              className={`h-full !text-sm !px-[15px] w-max`}
              onClick={handleTimeoffDays}
              loading={loading}
              loadingText={'Unlocking'}
              disabled={Math.floor(availableDGCoin / coinValue) < 1}
            >
              Unlock <span className="hidden md:block">for</span>
              <span
                className={`md:flex items-center hidden ${loading && '!hidden'
                  }`}
              >
                <Image
                  src="/images/dgCoin.png"
                  width={20}
                  height={20}
                  alt="reward"
                />
              </span>
              <span className="hidden md:block">{coinValue * dayCount}</span>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PurchaseOffDayModal;
