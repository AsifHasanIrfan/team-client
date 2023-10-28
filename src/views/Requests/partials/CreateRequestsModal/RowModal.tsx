import React, { useEffect, useState } from 'react';
import Modal from '@components/Modal';
import { GetTimeoffAPIRequestDataType } from '@config/types';
import Button from '@components/Button';
import Input from '@views/Setting/Input';
import Select from 'react-select';
import { timeOffStatusUpdate } from '@redux/actions/timeoff';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import toast from 'react-hot-toast';
import useTimeoffs from '@hooks/useTimeoffs';
import useUser from '../../../../hooks/useUser';
import dayjs from 'dayjs';
import useTimeoffsById from '@hooks/useTimeoffsById';

const options = [
  { value: '', label: 'Select' },
  { value: 'approved', label: 'Approved' },
  { value: 'decline', label: 'Declined' },
];

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string;
  data: any;
}

const RowModal = ({ open, setOpen, userId, data }: Props) => {

  // global variable from redux
  const dispatch = useAppDispatch();
  const { auth, timeoff, socket } = useAppSelector(state => state);

  // hooks
  const { timeoffsFetch } = useTimeoffs(auth?.token);
  const { timeoffsByIdFetch } = useTimeoffsById(auth?.token, auth?.user?._id);
  const { userFetch } = useUser(auth?.token, data?.user?._id);

  // get selected option
  const [selectedOption, setSelectedOptions] = useState(options[0]);

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

  // setting selected data by status
  useEffect(() => {
    setSelectedOptions(options.find((item: any) => item.value === data?.status) || options[0])
  }, [data?.status])

  // converting hrs and days from start and end date
  const getTotalDays = (startDate: any, endDate: any) => {
    const msInHour = 1000 * 60 * 60;

    const dayJsStartDate = dayjs(startDate)
    const dayJsEndDate = dayjs(endDate)

    // @ts-ignore
    const abs = Math.abs(dayJsEndDate - dayJsStartDate) + 86400000;

    const totalHrs = Math.round(abs / msInHour);
    const totalDays = Math.round(totalHrs / 24);

    return totalDays;
  }

  const handleTimeoffStatus = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();

    const totalDays = getTotalDays(data?.startDate, data?.endDate);

    const sendData = { status: selectedOption.value, totalDays: totalDays }

    // checking is status null
    if (sendData.status === '') {
      toast.error('Please change the status!');
      return;
    }

    const notifyData = {
      recipients: [userId],
      url: '/dashboard/timeoff',
      // @ts-ignore
      content: `Your ${data?.type} request has been ${selectedOption.value}`
    }

    dispatch(timeOffStatusUpdate(sendData, auth.token, data._id, data?.user?.username, setOpen, socket, notifyData, timeoffsFetch, userFetch, timeoffsByIdFetch));
  }

  return (
    <Modal open={open} setOpen={setOpen} title={'Timeoff Request'}>
      <div className="w-[330px] md:w-[500px] xl:w-[850px]">
        <form onSubmit={handleTimeoffStatus}>
          <div className="mb-[15px] sm:mb-[20px] w-full">
            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
              Time Off Type
            </h2>

            <div>
              <Input value={data?.type} readOnly className="text-lg" />
            </div>
          </div>

          <div className="w-full flex items-center flex-wrap md:flex-nowrap gap-x-[18px] xl:gap-x-[20px]">
            <div className="w-full md:w-1/2 mb-[20px]">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500]">
                Start date
              </h2>

              <Input value={data?.startDate} readOnly className="text-lg" />
            </div>

            <div className="w-full md:w-1/2 mb-[20px]">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500]">
                End date
              </h2>

              <Input value={data?.endDate ? data?.endDate : 'n/a'} readOnly className="text-lg" />
            </div>
          </div>

          {data?.type === 'Partial Timeoff' && <div className="w-full flex items-center flex-wrap md:flex-nowrap gap-x-[18px] xl:gap-x-[20px]">
            <div className="w-full md:w-1/2 mb-[15px]">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500]">
                Start Time
              </h2>

              <Input value={data?.partialStartTime} readOnly className="text-lg" />
            </div>

            <div className="w-full md:w-1/2 mb-[15px]">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500]">
                End Time
              </h2>

              <Input value={data?.partialEndTime} readOnly className="text-lg" />
            </div>
          </div>}

          {data?.type === 'Change Off Day' ? <div className="mb-[15px] sm:mb-[20px] w-full">
            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
              Day
            </h2>

            <div>
              <Input value={data?.day} readOnly className="text-lg" />
            </div>
          </div> : null}

          <div className="flex flex-col w-full mb-[15px]">
            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
              Reason for time off
            </h2>
            <Input value={data?.description} readOnly className="text-lg" />
          </div>

          <div className="flex flex-col w-full">
            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
              Request Status
            </h2>
            <div className="p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] ">

              <Select
                defaultValue={options.find((item: any) => item.value === data?.status)}
                options={options}
                styles={customStyle}
                isSearchable={false}
                id="selectbox"
                instanceId="selectbox"
                onChange={(option: any) => {
                  setSelectedOptions(option)
                }}
              />

            </div>
          </div>

          <div className="flex justify-end mt-[40px]">

            <div className="md:w-[155px] w-full h-[50px] shrink-0 self-end">
              <Button
                rounded="md"
                className="w-full h-full !text-sm !px-[15px]"
                disabled={selectedOption.value === ''}
                loading={timeoff?.timeoff_update_loading}
                loadingText={'Updating'}
              >
                Update
              </Button>
            </div>
          </div>

        </form>
      </div>
    </Modal>
  );
};

export default RowModal;
