import React, { useEffect, useState } from 'react';
import Modal from '@components/Modal';
import { RowModal, SendTimeoffAPISendDataType } from '@config/types';
import Select from 'react-select';

import { VscCalendar } from 'react-icons/vsc';
import Button from '@components/Button';
import DatePicker from '@components/DatePicker';
import dayjs from 'dayjs';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import ModalNav from './ModalNav';
import toast from 'react-hot-toast';
import useTimeoffs from '@hooks/useTimeoffs';
import axios from 'axios';
import { createNotification } from '@redux/actions/notification';
import { getTimeDiff, isEndDateGreaterThanStartDate, isInThePast, isStartDateGreaterThanToday } from '@hooks/helpers';
import ChangeOffDay from './ChangeOffDay';
import moment from 'moment';
import useTimeoffsById from '@hooks/useTimeoffsById';

const options = [
  { value: '', label: 'Select' },
  { value: 'medicalEmergency', label: 'Sick day' },
  { value: 'vacation', label: 'Vacation' },
];

const RowModal: React.FC<RowModal> = ({ open, setOpen, dataId, availableSickDays, availableVacationDays, weeklyOffday, userId, token, userFetch }) => {

  // input number field
  const exceptThisSymbols = ["e", "E", "+", "-", "."];

  // global variable from redux
  const dispatch = useAppDispatch();
  const { auth, socket } = useAppSelector((state) => state);

  // hooks
  const { timeoffsFetch } = useTimeoffs(auth?.token);
  const { timeoffsByIdFetch } = useTimeoffsById(auth?.token, auth?.user?._id);

  // states
  const [startDatePick, setStartDate] = useState(dayjs());
  const [startDatePicker, setStartDatePicker] = useState(false);
  const [endDatePicker, setEndDatePicker] = useState(false);
  const [endDatePick, setEndDate] = useState(dayjs());
  const [loading, setLoading] = useState(false);

  // change date date to send for api
  const [sendStartDate, setSendStartDate] = useState('');
  const [sendEndDate, setSendEndDate] = useState('');

  // set late min & hour
  const [lateHour, setLateHour] = useState<any>(0);
  const [lateMinute, setLateMinute] = useState<any>(0);

  // get selected option
  const [selectedOption, setSelectedOptions] = useState(options[0]);
  const [openTab, setOpenTab] = useState(1);

  // initial data
  const [initialTimeoffState, setInitialTimeoffState] = useState<SendTimeoffAPISendDataType>({
    type: options[1].label, startDate: '', endDate: '', lateTime: '', description: '', user: '', partialStartTime: '', partialEndTime: '', status: 'progress'
  })

  // data to send on api
  const [data, setData] = useState<SendTimeoffAPISendDataType>({
    type: selectedOption.label, startDate: sendStartDate, endDate: sendEndDate, lateTime: '', description: '', user: '', partialStartTime: '', partialEndTime: '', status: 'progress'
  })

  useEffect(() => {
    setSendStartDate(startDatePick.format('YYYY-MM-DD'));
    setSendEndDate(endDatePick.format('YYYY-MM-DD'));
  }, [startDatePick, endDatePick]);

  const startDateRef = useDetectClickOutside({ onTriggered: () => setStartDatePicker(false), });
  const endDateRef = useDetectClickOutside({ onTriggered: () => setEndDatePicker(false), });

  const customStyle = {
    control: (provided: any) => ({
      ...provided,
      height: 0,
      minHeight: '33px',
      padding: 0,
      margin: 0,
      marginLeft: 0,
      border: '0px solid black',
      fontSize: 16,
      backgroundColor: 'white',
      cursor: 'pointer',
      outline: 'none',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#C10206' : 'transparent',
      color: state.isSelected ? 'white' : 'initial',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: state.isSelected ? '#C10206' : '#e5e7eb',
        color: state.isSelected ? 'white' : 'initial',
      },
    }),
  };

  //time off create function
  const handleTimeOffSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();

    if (isInThePast(new Date(sendStartDate))) {
      toast.error(`Can't request with past date!`);
      return;
    }

    // get total days by
    const getTotalDays = getTimeDiff(new Date(sendStartDate), new Date(sendEndDate), false)

    if (openTab === 2) {
      if (isEndDateGreaterThanStartDate(sendStartDate, sendEndDate)) {
        toast.error('End Date can not be less than start date!');
        return;
      }
    }

    // checking late time field is empty
    if (openTab === 1) {
      if (!lateHour && !lateMinute) {
        toast.error('Add late hr/min!');
        return;
      }
    }

    // checking late time field is empty
    if (openTab === 3) {
      if (!data.partialStartTime && (!data.partialEndTime)) {
        toast.error('Add partial start/end time!');
        return;
      }
    }

    // checking reason field is empty
    if (data.description === '') {
      toast.error('Please add reason!')
      return;
    }

    let newData: any;

    if (openTab === 2) {
      newData = {
        ...data,
        startDate: sendStartDate,
        endDate: sendEndDate,
        lateTime: '',
        for: "Time off",
        user: auth.user._id,
        partialStartTime: '',
        formattedPartialEndTime: '',
        totalDays: getTotalDays
      }
    } else if (openTab === 3) {

      const formattedPartialStartTime = moment(data.partialStartTime, 'hh:mm').format('hh:mm:ss a');
      const formattedPartialEndTime = moment(data.partialEndTime, 'hh:mm').format('hh:mm:ss a');

      const formattedStart = moment(data.partialStartTime, 'hh:mm').format('hh:mm:ss a').split(" ");
      const formattedEnd = moment(data.partialEndTime, 'hh:mm').format('hh:mm:ss a').split(" ");


      let m1;
      let m2;

      if (formattedStart.includes('am')) {
        m1 = moment(sendStartDate + ' ' + data.partialStartTime, 'DD-MM-YYYY HH:mm').add('days', 1);
      } else {
        m1 = moment(sendStartDate + ' ' + data.partialStartTime, 'DD-MM-YYYY HH:mm');
      }

      if (formattedEnd.includes('am')) {
        m2 = moment(sendStartDate + ' ' + data.partialEndTime, 'DD-MM-YYYY HH:mm').add('days', 1);
      } else {
        m2 = moment(sendStartDate + ' ' + data.partialEndTime, 'DD-MM-YYYY HH:mm');
      }

      var m3 = m2.diff(m1, 'minutes');
      var m4 = m2.diff(m1, 'h');
      var numdays = Math.floor(m3 / 1440);
      var numhours = Math.floor((m3 % 1440) / 60);
      var numminutes = Math.floor((m3 % 1440) % 60);
      const res = numhours + ' ' + "hour" + " " + numminutes + " " + "min";

      newData = {
        ...data,
        startDate: sendStartDate,
        type: 'Partial Timeoff',
        lateTime: `${res}`,
        for: "Partial Timeoff",
        user: auth.user._id,
        partialStartTime: formattedPartialStartTime,
        partialEndTime: formattedPartialEndTime,
        partialHour: numhours,
        partialMin: numminutes,
      }
    } else {
      newData = {
        ...data,
        startDate: sendStartDate,
        type: 'Late Meeting',
        lateTime: `${lateHour ? lateHour + ' hour ' + lateMinute + ' min' : lateMinute + ' minute'}`,
        for: 'Late Meeting',
        user: auth.user._id,
        partialStartTime: '',
        formattedPartialEndTime: '',
      };
    }

    setLoading(true);
    axios.post(`${process.env.serverUrl}timeoff/create`, newData, {
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
            content: `${auth.user.firstName + ' ' + auth.user.lastName} request for ${newData.for}`
          }
          dispatch(createNotification(notifyData, auth.token, socket))

          timeoffsFetch();
          timeoffsByIdFetch();
          setOpen(false);
          // state null
          setLateHour(0)
          setLateMinute(0)
          setData(initialTimeoffState);
          setStartDate(dayjs())
          setEndDate(dayjs())
          toast.success(response.data.message);
        }
      });
  };

  return (
    <Modal open={open} setOpen={setOpen} title={'Request Timeoff'}>
      <div className="w-[330px] md:w-[500px] xl:w-[850px] timeoff__createModal">
        {/* modal nav start */}
        <ModalNav openTab={openTab} setOpenTab={setOpenTab} />
        {/* modal nav end */}

        {openTab !== 4 ? <form onSubmit={handleTimeOffSubmit}>
          {openTab === 2 && (
            <div className="mb-[15px] sm:mb-[20px] w-full">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                Time Off Type
              </h2>

              <div className="w-full p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] ">
                <Select
                  defaultValue={options[0]}
                  options={options}
                  styles={customStyle}
                  value={selectedOption}
                  id="selectbox"
                  instanceId="selectbox"
                  onChange={(option: any) => {
                    setSelectedOptions(option);
                    setData({ ...data, type: option.label });
                  }}
                  isSearchable={false}
                  formatOptionLabel={({
                    label,
                  }: any) => <>{label}</>}
                />
              </div>
            </div>
          )}

          <div className={`w-full flex items-center flex-wrap md:flex-nowrap gap-x-[18px] xl:gap-x-[20px] ${(openTab === 1 || openTab === 3) && 'latejoin'}`}>
            <div className={`w-full ${openTab === 2 ? 'md:w-1/2 mb-[10px]' : 'mb-[20px]'}`}>
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                {openTab === 2 ? 'Start date' : 'Date'}
              </h2>

              <div
                className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative"
                onClick={() => setStartDatePicker(true)}
                ref={startDateRef}
              >
                <p className="ml-2">{startDatePick.format('DD-MM-YYYY')}</p>
                {startDatePicker && (
                  <DatePicker
                    selectedDate={startDatePick}
                    onChange={setStartDate}
                  />
                )}
                <VscCalendar className="ml-5" />
              </div>
            </div>


            {openTab === 2 && <div className="w-full md:w-1/2 mb-[10px]">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                End date
              </h2>

              <div
                className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative"
                onClick={() => setEndDatePicker(true)}
                ref={endDateRef}
              >
                <p className="ml-2">{endDatePick.format('DD-MM-YYYY')}</p>
                {endDatePicker && (
                  <DatePicker selectedDate={endDatePick} onChange={setEndDate} />
                )}
                <VscCalendar className="ml-5" />
              </div>
              {/* <div className='py-7'></div> */}
            </div>}
          </div >

          {/* {(openTab === 2 && selectedOption.value === 'vacation') &&
            <div className='flex items-center mb-3'>
              <p className='mt-[8px] text-primary'>Please select a time after 5 days. You must allow a 5 day notice before taking Vacation Days</p>
            </div>
          } */}

          <div className="flex flex-col w-full">

            <div className={`w-full flex items-center flex-wrap md:flex-nowrap gap-x-[18px] xl:gap-x-[20px]`}>
              {(openTab === 1) && <div className={`w-full 'md:w-1/2' mb-[20px]`}>
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                  {openTab === 1 ? 'Late Hour' : openTab === 3 ? 'Total Hour' : null}
                </h2>

                <div className="w-full overflow-hidden h-[60px] border border-solid border-[#E0E0E0] rounded-[8px] py-4 px-5 relative mb-[15px] ">
                  <input
                    // value={lateHour}
                    onChange={e => setLateHour(e.target.value)}
                    type="number"
                    min={0}
                    max={8}
                    placeholder="1"
                    className="w-full h-full border-none outline-none"
                    onKeyDown={(e: any) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                  />
                  <span className='absolute top-[14px] tracking-normal text-primary right-4 font-medium text-[20px]'>Hour</span>
                </div>
              </div>}

              {(openTab === 1) && <div className={`w-full 'md:w-1/2' mb-[20px]`}>
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                  {openTab === 1 ? 'Late Minute' : openTab === 3 ? 'Total Minute' : null}
                </h2>

                <div className="w-full overflow-hidden h-[60px] border border-solid border-[#E0E0E0] rounded-[8px] py-4 px-5 relative mb-[15px] ">
                  <input
                    // value={lateMinute}
                    onChange={e => setLateMinute(e.target.value)}
                    type="number"
                    min={0}
                    max={59}
                    placeholder="1"
                    className="w-full h-full border-none outline-none"
                    onKeyDown={(e: any) => exceptThisSymbols.includes(e.key) && e.preventDefault()}
                  />
                  <span className='absolute top-[14px] tracking-normal text-primary right-4 font-medium text-[20px]'>Min</span>
                </div>
              </div>}

            </div>

            {openTab === 3 && <div className={`w-full flex items-center flex-wrap md:flex-nowrap gap-x-[18px] xl:gap-x-[20px]`}>
              <div className={`w-full 'md:w-1/2' mb-[20px]`}>
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                  Start Time
                </h2>

                <div className="w-full overflow-hidden h-[60px] border border-solid border-[#E0E0E0] rounded-[8px] py-4 px-5 relative mb-[15px] ">
                  <input
                    // value={lateHour}
                    // min="18:55" max="4:00"
                    onChange={e => setData({ ...data, partialStartTime: e.target.value })}
                    type="time"
                    className="w-full h-full border-none outline-none"
                  />
                </div>
              </div>

              <div className={`w-full 'md:w-1/2' mb-[20px]`}>
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                  End Time
                </h2>

                <div className="w-full overflow-hidden h-[60px] border border-solid border-[#E0E0E0] rounded-[8px] py-4 px-5 relative mb-[15px] ">
                  <input
                    // value={lateMinute}
                    disabled={!data.partialStartTime}
                    // min="0:00" max="3:00"
                    onChange={e => setData({ ...data, partialEndTime: e.target.value })}
                    type="time"
                    className="w-full h-full border-none outline-none"
                  />
                </div>
              </div>

            </div>}



            <div>
              <h2 className={`text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px] ${openTab === 2 ? 'mt-[15px]' : null}`}>
                Reason
              </h2>

              <div className="w-full overflow-hidden h-[60px] border border-solid border-[#E0E0E0] rounded-[8px] py-4 px-5 relative mb-[15px] ">
                <input
                  value={data.description}
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  type="text"
                  placeholder="Type here"
                  className="w-full h-full border-none outline-none"
                />
              </div>
            </div>

            <div className={`${openTab === 1 ? 'md:w-[250px]' : 'md:w-[200px]'}  w-full h-[50px] mt-[10px] self-end`}>
              <Button
                rounded="md"
                className={`w-full h-full !text-sm !px-[15px]`}
                disabled={loading || !data?.description || (openTab === 2 && selectedOption.value === '') || (openTab === 3 && !data.partialStartTime) || (openTab === 3 && !data.partialEndTime)}
                loading={loading}
                loadingText={'Requesting'}
              >
                {openTab === 1 ? 'Request Late Meeting' : 'Request Timeoff'}
              </Button >
            </div>

          </div >
        </form > : <ChangeOffDay weeklyOffday={weeklyOffday} token={token} userId={userId} setOpen={setOpen} userFetch={userFetch} timeoffsFetch={timeoffsFetch} timeoffsByIdFetch={timeoffsByIdFetch} />}
      </div >
    </Modal >
  );
};

export default RowModal;