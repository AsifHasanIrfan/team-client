import React, { useState } from 'react';
import Button from '@components/Button';

import toast from 'react-hot-toast';
import axios from 'axios';
import PaymentHistory from './PaymentHistory';
import formatNumberInput from '@hooks/formatNumberInput';
import Header from '@views/UserProfile/partials/Header';
// import Input from '@views/UserProfile/partials/Input';
import ViewLess from '@views/UserProfile/partials/ViewLess';
import ProfileInput from '@components/Input/ProfileInput';
import useGetPayments from '@hooks/useGetPayments';

type Props = {
  userId: any;
  token: any;
}

const UserSalary = ({ userId, token }: Props) => {

  // states
  const [tableActive, setTableActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({ monthlyPayment: '' });
  const { monthlyPayment } = input;

  // hooks
  const { payments, paymentsLoading, paymentsFetch } = useGetPayments(token, userId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInput((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // submitting data for update
  const handleSubmit = async () => {

    if (monthlyPayment === '') {
      toast.error("Enter monthly salary");
      return;
    }

    setLoading(true);

    const { data } = await axios.post(
      `${process.env.serverUrl}user/update-payment/${userId}`, { salary: parseFloat(monthlyPayment) }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
    );
    if (data.success) {
      paymentsFetch();
      setLoading(false);
      toast.success(data.message);
      setInput({ ...input, monthlyPayment: '' })
    } else {
      setLoading(false);
      toast.error(data.message);
    }
  };

  return (
    <div className="flex flex-col px-[30px] py-[18px] mt-[30px] rounded-[20px] bg-[#FFFFFF] tasksPage-shadow relative">

      <Header>User Salary</Header>

      <div className="flex flex-col w-full">
        <div className="grid w-full gap-y-[10px] mt-[30px]">
          <ProfileInput
            label={'Monthly payment'}
            id={'monthlyPayment'}
            type={'number'}
            value={monthlyPayment}
            isRequired={true}
            placeholder={'$0000'}
            onChange={handleInputChange}
            onKeyDown={(e: any) => formatNumberInput(e)}
          />

          {/* table data */}
          {tableActive && (
            <PaymentHistory
              tableData={payments?.datas}
              loading={paymentsLoading}
            />
          )}

          {/* button */}
          <div className="w-fit" role='button' onClick={() => setTableActive(!tableActive)}>
            <ViewLess active={tableActive} />
          </div>
        </div>

        <div className="w-full h-[50px] flex mt-[30px] items-center justify-end">
          <Button
            className="w-[200px] h-full !p-0 !rounded-[10px]"
            onClick={handleSubmit}
            disabled={monthlyPayment === '' || loading}
            loading={loading}
            loadingText={'Updating'}
          >
            Update
          </Button>
        </div>

      </div>
    </div>
  );
};
export default UserSalary;
