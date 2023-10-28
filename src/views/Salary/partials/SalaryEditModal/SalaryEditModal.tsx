import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Modal from '@components/Modal';
import Button from '@components/Button';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { VscCalendar } from 'react-icons/vsc';
import { createNotification } from '@redux/actions/notification';
import useSalaries from '@hooks/useSalaries';
import StatusOption from '@views/Salary/components/SalaryTable/CreateSalaryModal/partials/StatusOption';

type EditSalaryModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data: any;
  userId: string;
};

// options for select value
const SalaryStatusOptions = [
  { value: 'processing', label: 'Processing', message: 'processing' },
  { value: 'paid', label: 'Paid', message: 'paid' },
  { value: 'cancel', label: 'Cancel', message: 'cancelled' },
];

const SalaryEditModal: React.FC<EditSalaryModalProps> = ({
  open,
  setOpen,
  data,
  userId,
}) => {
  // global variable from redux
  const { auth, socket } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const salaryId = data?._id;
  const { salariesFetch } = useSalaries(auth.token);

  // states
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(SalaryStatusOptions[0]);
  // salary amount
  const [salaryAmount, setSalaryAmount] = useState('');

  // set status by data
  useEffect(() => {
    setSelectedOption(
      SalaryStatusOptions.find((item: any) => item.value === data?.status) ||
      SalaryStatusOptions[0]
    );
  }, [data?.status]);

  // submitting form
  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    setLoading(true);

    const { data } = await axios.patch(
      `${process.env.serverUrl}salary/${salaryId}/update`,
      { status: selectedOption.value },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    if (data.success) {
      salariesFetch();
      setLoading(false);
      toast.success(data.message);

      const notifyData = {
        recipients: [userId],
        url: '/dashboard/salary',
        // @ts-ignore
        content: `Your salary for this month is ${selectedOption.message}`,
      };
      dispatch(createNotification(notifyData, auth.token, socket));
      setOpen(false);
      setSalaryAmount('');
    } else {
      setLoading(false);
      toast.success(data.message);
      setSalaryAmount('');
    }
  };

  return (
    <span>
      <Modal setOpen={setOpen} open={open} title={'Edit Salary'}>
        <div className="w-[330px] md:w-[500px] xl:w-[850px] overflow-hidden">
          <form className="font-primary space-y-[18px]" onSubmit={handleSubmit}>
            <div className="flex gap-x-[18px] xl:gap-x-[20px]">

              <div className="mb-[15px] sm:mb-[20px] w-full">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  Expected delivery
                </h2>

                <div className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative ">
                  <p className="ml-2">
                    {dayjs(data?.startDate).format('DD-MM-YY')}
                  </p>

                  <VscCalendar className="ml-5" />
                </div>
              </div>
              <div className="w-full">
                <label
                  className="font-medium text-base leading-6 inline-block mb-2.5"
                  htmlFor="statusSelect"
                >
                  Status
                </label>
                <div className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative">
                  {data?.user?.firstName} {data?.user?.lastName}
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
                <div className="w-full p-[5px] xl:py-3 xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px]">
                  <StatusOption
                    options={SalaryStatusOptions}
                    defaultValue={SalaryStatusOptions.find(
                      (item: any) => item.value === data?.status
                    )}
                    onChange={(option: any) => {
                      setSelectedOption(option);
                    }}
                    values={selectedOption}
                  />
                </div>
              </div>
              <div className="mb-[15px] sm:mb-[20px] w-full">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  Amount
                </h2>

                <div className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative">
                  {data?.amount}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end !mt-10">
              <Button
                rounded="md"
                type="submit"
                loading={loading}
                loadingText={'Updating'}
              >
                Update
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </span>
  );
};
export default SalaryEditModal;
