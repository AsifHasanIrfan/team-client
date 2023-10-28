import Button from '@components/Button'
import useChangeOffDayReq from '@hooks/useChangeOffDayReq';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import DatePicker from '@components/DatePicker';
import { VscCalendar } from 'react-icons/vsc';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { isStartDateGreaterThanToday } from '@hooks/helpers';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { createNotification } from '@redux/actions/notification';

type Props = {
    weeklyOffday: any;
    setOpen: any;
    userId: any;
    token: any;
    userFetch: any;
    timeoffsFetch: any;
    timeoffsByIdFetch: any;
}

const options = [
    // { label: 'Select', value: '' },
    { label: 'Saturday', value: 'Saturday', dayValue: 6 },
    { label: 'Sunday', value: 'Sunday', dayValue: 0 },
    { label: 'Monday', value: 'Monday', dayValue: 1 },
    { label: 'Tuesday', value: 'Tuesday', dayValue: 2 },
    { label: 'Wednesday', value: 'Wednesday', dayValue: 3 },
    { label: 'Thursday', value: 'Thursday', dayValue: 4 },
    { label: 'Friday', value: 'Friday', dayValue: 5 },
]

const ChangeOffDay = ({ weeklyOffday, token, userId, setOpen, userFetch, timeoffsFetch, timeoffsByIdFetch }: Props) => {

    // global variable from redux
    const dispatch = useAppDispatch();
    const { auth, socket } = useAppSelector((state) => state);

    // hooks
    const { changeOffDaysFetch } = useChangeOffDayReq(token);

    // states
    const [loading, setLoading] = useState(false)
    const [description, setDescription] = useState("")
    const [selectedDay, setSelectedDay] = useState<any>(options[0]);

    const [datePick, setDate] = useState(dayjs());
    const [datePicker, setDatePicker] = useState(false);

    const startDateRef = useDetectClickOutside({ onTriggered: () => setDatePicker(false), });

    // setting state
    useEffect(() => {
        const getDay = datePick.get('day');
        console.log(options.find((item: any) => item.dayValue === getDay))
        setSelectedDay(options.find((item: any) => item.dayValue === getDay))

    }, [datePick])

    // function
    const handleChangeOffDay = (e: any) => {
        e.preventDefault();

        const date = datePick.format('YYYY-MM-DD');

        if (!isStartDateGreaterThanToday(date)) {
            toast.error(
                `Date must be from ${dayjs()
                    .add(5, 'day')
                    .format('DD-MM-YYYY')}`
            );
            return;
        }

        if (description === '') {
            toast.error('Please add reason!')
            return;
        }

        const data = {
            startDate: date,
            day: selectedDay.value,
            type: 'Change Off Day',
            for: "Change off day",
            description: description,
            user: userId,
        }

        setLoading(true);
        // axios.post(`${process.env.serverUrl}change-offday`, data, {
        //     headers: {
        //         'content-type': 'application/json',
        //         authorization: `Bearer ${token}`,
        //     },
        // })
        //     .then((response) => {
        //         setLoading(false);
        //         if (response.data.success === false) {
        //             return toast.error(response.data.message);
        //         }
        //         if (response.data.success === true) {
        //             userFetch();
        //             changeOffDaysFetch();
        //             setOpen(false);
        //             toast.success(response.data.message);
        //         }
        //     });

        axios.post(`${process.env.serverUrl}timeoff/create`, data, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${auth.token}`
            }
        })
            .then(response => {
                setLoading(false);
                if (response.data.success === false) {
                    return toast.error(response.data.message);
                }

                if (response.data.success === true) {

                    socket.emit("createTimeoff", { ...response.data.datas })
                    const notifyData = {
                        recipients: [],
                        isAdmin: true,
                        url: '/dashboard/requests',
                        // @ts-ignore
                        content: `${auth.user.firstName + ' ' + auth.user.lastName} request for ${data.for}`
                    }
                    dispatch(createNotification(notifyData, token, socket))

                    timeoffsFetch();
                    timeoffsByIdFetch();
                    setOpen(false);
                    userFetch();
                    // state null

                    setDate(dayjs())
                    toast.success(response.data.message);
                }
            });
    }

    return (
        <form className='!my-[40px] flex flex-col latejoin' onSubmit={handleChangeOffDay}>

            <div className={`w-full mb-[20px]`}>
                <div className={`w-full`}>
                    <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                        Select Date
                    </h2>

                    <div
                        className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative"
                        onClick={() => setDatePicker(true)}
                        ref={startDateRef}
                    >
                        <p className="ml-2">{datePick.format('DD-MM-YYYY')}</p>
                        {datePicker && (
                            <DatePicker
                                selectedDate={datePick}
                                onChange={setDate}
                            />
                        )}
                        <VscCalendar className="ml-5" />
                    </div>
                </div>
            </div>


            <div>
                <h2 className={`text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]`}>
                    Reason
                </h2>

                <div className="w-full overflow-hidden h-[60px] border border-solid border-[#E0E0E0] rounded-[8px] py-4 px-5 relative mb-[15px] ">
                    <input
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        type="text"
                        placeholder="Type here"
                        className="w-full h-full border-none outline-none"
                    />
                </div>
            </div>

            <div className='mb-5 font-medium'>
                <p>Your selected off day: <span className='text-primary'>{selectedDay.value ? selectedDay.value : 'Not Selected Yet'}</span></p>
                <p className='text-primary mt-2'>Note: Please select a time after 5 days. You must allow a 5 day notice before changing off day.</p>
            </div>

            <div className={`md:w-[200px] w-full h-[50px] mt-[30px] self-end`}>
                <Button
                    rounded="md"
                    className={`w-full h-full !text-sm !px-[15px]`}
                    disabled={loading}
                    loading={loading}
                    loadingText={'Requesting'}
                >
                    Change Off Day
                </Button >
            </div>

        </form >
    )
}

export default ChangeOffDay