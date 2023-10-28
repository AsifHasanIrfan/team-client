import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

import Modal from '@components/Modal';
import { VscCalendar } from 'react-icons/vsc';
import DatePicker from '@components/DatePicker';
import dayjs from 'dayjs';
import { useDetectClickOutside } from 'react-detect-click-outside';

import Button from '@components/Button';
import StatusOption from './partials/StatusOption';
import SelectUserOption from './partials/SelectUserOption';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import formatNumberInput from '@hooks/formatNumberInput';
import { createNotification } from '@redux/actions/notification';
import useSalaries from '@hooks/useSalaries';
import useAdminUsers from '@hooks/useAdminUsers';

// options for select value
const SalaryStatusOptions = [
  { value: 'select', label: 'Select' },
  { value: 'processing', label: 'Processing' },
  { value: 'paid', label: 'Paid' },
];

function CreateSalaryModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // global states
  const { auth, socket } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  // hooks
  const { salariesFetch } = useSalaries(auth.token);
  const { adminUsers, adminUsersFetch } = useAdminUsers(auth.token);

  const [loading, setLoading] = useState(false);
  // date
  const [startDate, setStartDate] = useState(dayjs());

  // change date date to send for api
  const [sendStartDate, setSendStartDate] = useState('');
  const [sendEndDate, setSendEndDate] = useState('');

  // select salary options
  const [selectedOption, setSelectedOption] = useState(SalaryStatusOptions[0]);
  // salary amount
  const [salaryAmount, setSalaryAmount] = useState('');

  //get users and selected user options
  const [Users, setUsers] = useState([]);
  const userName =
    Users?.filter((e: any) => e?.role === 'employee').map((e: any) => {
      return {
        label: `${e.firstName} ${e.lastName}`,
        value: e._id,
      };
    }) || [];
  const [selectedUser, setSelectedUser] = useState(userName[0]);

  // picker
  const [startDatePicker, setStartDatePicker] = useState(false);

  // reference
  const startDateRef = useDetectClickOutside({
    onTriggered: () => setStartDatePicker(false),
  });

  // checking past dates
  function isInThePast(date: any) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today;
  }

  // submitting form
  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    if (isInThePast(new Date(sendStartDate))) {
      toast.error('Expected date can not be less than present date!');
      return;
    }

    setLoading(true);
    const salaryInfo = {
      userId: selectedUser.value,
      startDate,
      // endDate,
      // arriveBy: arriveByDate,
      amount: salaryAmount,
      status: selectedOption.value,
    };
    const { data } = await axios.post(
      `${process.env.serverUrl}salary/create`,
      salaryInfo as any,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    if (data.success) {
      salariesFetch();
      adminUsersFetch();
      setLoading(false);
      toast.success(data.message);

      const notifyData = {
        recipients: [selectedUser.value],
        url: '/dashboard/salary',
        // @ts-ignore
        content: `Your salary for this month is ${selectedOption.value}`,
      };

      dispatch(createNotification(notifyData, auth.token, socket));
      socket.emit('createSalary', {
        recipients: [selectedUser.value],
        data: data.salary,
      });

      setOpen(false);
      setSelectedOption({
        value: 'select',
        label: 'Select',
      });
      setSalaryAmount('');
      setStartDate(dayjs());
      setSelectedUser({
        value: 'select',
        label: 'Select',
      });
    }
  };

  useEffect(() => {
    setSendStartDate(startDate.format('YYYY-MM-DD'));
  }, [startDate]);

  useEffect(() => {
    setUsers(adminUsers?.users)
  }, [adminUsers?.users]);

  return (
    <Modal setOpen={setOpen} open={open} title="Create Salary">
      <div className="w-[330px] md:w-[550px] lg:w-[630px] xl:w-[850px] overflow-hidden">

        <form className="font-primary space-y-[18px]" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[18px] xl:gap-x-[20px]">
            <div className="mb-[15px] sm:mb-[20px] w-full">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                Excepted delivery
              </h2>

              <div
                className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative cursor-pointer"
                onClick={() => setStartDatePicker(true)}
                ref={startDateRef}
              >
                <p className="ml-2">{startDate.format('DD-MM-YYYY')}</p>
                {startDatePicker && (
                  <DatePicker
                    selectedDate={startDate}
                    onChange={setStartDate}
                  />
                )}
                <VscCalendar className="ml-5" />
              </div>
            </div>

            <div className="w-full">
              <label
                className="font-medium text-base leading-6 inline-block mb-2.5"
                htmlFor="statusSelect"
              >
                Select user
              </label>
              <div className="w-full p-[5px] xl:py-3 xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0]">
                <SelectUserOption
                  onChange={(option: any) => setSelectedUser(option)}
                  values={selectedUser}
                  defaultValue="Select"
                  options={userName}
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-x-[18px] xl:gap-x-[20px]">
            <div className="w-full">
              <label
                className="font-medium text-base leading-6 inline-block mb-2.5"
                htmlFor="statusSelect"
              >
                Status
              </label>
              <div className="w-full p-[5px] xl:py-3 xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0]">
                <StatusOption
                  onChange={(option: any) => setSelectedOption(option)}
                  values={selectedOption}
                  defaultValue="Select"
                  options={SalaryStatusOptions}
                />
              </div>
            </div>
            <div className="mb-[15px] sm:mb-[20px] w-full">
              <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                Amount
              </h2>

              <div className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative">
                <input
                  type="number"
                  placeholder="$000"
                  className="w-full h-full outline-none"
                  onChange={(e) => setSalaryAmount(e.target.value)}
                  onKeyDown={(e) => formatNumberInput(e)}
                  name="salaryAmount"
                  value={salaryAmount}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end !mt-10">
            <Button rounded="md" type="submit" loading={loading}>
              Submit
            </Button>
          </div>
        </form>

      </div>
    </Modal>
  );
}

export default CreateSalaryModal;
