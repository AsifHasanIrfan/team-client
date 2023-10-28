import React, { useState } from 'react'
import Modal from '@components/Modal';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import Button from '@components/Button';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';

type Props = {
    vacationDays: any;
    open: boolean;
    setOpen: (open: boolean) => void;
    userId: any;
    token: any;
    userFetch: any;
    availableMins: any;
}

const TradeModal = ({ open, setOpen, vacationDays, userId, token, userFetch, availableMins }: Props) => {

    const coinValue = 1000;

    // avilable days calculation
    const totalDaysAvailable = Math.floor((availableMins / 60) / 8);

    // states
    const [loading, setLoading] = useState(false);
    const [dayCount, setDayCount] = useState(1);

    const handleIncrement = () => setDayCount((prev) => (prev += 1));

    const handleDecrement = () => {
        if (dayCount > 1) {
            setDayCount((prev) => (prev -= 1));
        }
    };

    const handleTradeDays = async (e: any) => {
        const sendData = {
            totalTradeCoin: coinValue * dayCount,
            totalTradeDays: dayCount,
        };
        setLoading(true);

        const { data } = await axios.patch(
            `${process.env.serverUrl}/trade/${userId}`, sendData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        setLoading(false);
        if (data.success === true) {
            setDayCount(1)
            userFetch();
            toast.success(data.message);
            setOpen(false);
        }

        if (data.success === false) {
            toast.error(data.message);
        }
    }

    return (
        <Modal setOpen={setOpen} open={open} title={'Trade Off Days'}>
            <div className="w-[330px] md:w-[500px] xl:w-[850px] ">
                <h3 className="text-center text-[#1D1D1D] font-medium text-2xl">
                    You can trade a total of{' '}
                    {totalDaysAvailable} time off days
                </h3>

                {/* <div className="flex items-center justify-center my-8">
                    <button
                        type="button"
                        onClick={() => {
                            // setDayCount(1);
                            // setCurrentTab('vacationDays');
                        }}
                        className={`bg-[#EA002E] text-white cursor-default py-1.5 w-[120px] text-sm rounded-md text-center`}
                    >
                        Vacation Days
                    </button>
                </div> */}


                <div className="flex items-center justify-center my-3 gap-3 pt-3">
                    <span
                        className="py-[5px] px-[12px] border border-[#ddd] cursor-pointer text-xl"
                        onClick={handleDecrement}
                    >
                        <AiOutlineMinus />
                    </span>
                    <span className="py-[5px] px-[12px] border border-[#ddd] text-sm font-medium select-none">
                        {dayCount}
                        days
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
                        onClick={handleTradeDays}
                        loading={loading}
                        loadingText={'Redeeming'}
                        disabled={loading || totalDaysAvailable < 1}
                    >
                        Redeem <span className="hidden md:block">for</span>
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
    )
}

export default TradeModal