import Button from '@components/Button';
import { countryOptionsData, paymentMethodData } from '@config/constants';
import formatNumberInput from '@hooks/formatNumberInput';
import useUser from '@hooks/useUser';
import PaymentOption from '@views/Salary/components/PaymentMethod/PaymentOption/PaymentOption';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import BankDetailsModal from './BankDetailsModal';
import PaymentSubInput from './PaymentSubOptions/PaymentSubInput';

type Props = {
  token: string;
  userId: string;
};

const PaymentMethod = ({ token, userId }: Props) => {

  // hooks
  const { userFetch } = useUser(token, userId)

  // select states
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedOption, setSelectedOptions] = useState(paymentMethodData[0]);
  const [selectedCountry, setSelectedCountry] = useState(countryOptionsData[0]);
  const [openBankModal, setOpenBankModal] = useState(false);
  const [input, setInput] = useState<any>({
    name: '', number: '', country: '', accountName: '', districtName: '', branchName: '', bankName: ''
  })

  const paymentMethodUpdateAPI = (data: any, setLoading: any) => {
    setLoading(true);
    axios.patch(
      `${process.env.serverUrl}user/${userId}/update-payment`, data, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setLoading(false);
        if (response.data.success === false) {
          return toast.error(response.data.message);
        }

        if (response.data.success === true) {
          userFetch();
          setOpenBankModal(false);
          setInput({ name: '', number: '', country: '', accountName: '', districtName: '', branchName: '', bankName: '' })
          setSelectedOptions(paymentMethodData[0]);
          setSelectedCountry(countryOptionsData[0]);
          toast.success(response.data.message);
        }
      });
  }

  const handleUpdatePyamentMethod = (e: any) => {
    e.preventDefault();

    if (selectedOption.value === '') {
      toast.error('Please choose payment type!');
      return;
    }

    // checking is value given when value select as bkash
    if (selectedOption.value === 'bkash') {
      if (input.number === '') {
        toast.error('Please fill all payment field!');
        return;
      }
    }

    // send data and api call
    const data = { ...input, name: selectedOption.value, country: '', accountName: '', districtName: '', branchName: '', bankName: '' }
    paymentMethodUpdateAPI(data, setLoading)
  };

  return (
    <div className="currency_converter w-full lg:w-[50%] xl:w-[260px] 2xl:w-[540px] relative !z-[10000]">
      <div className="py-[13px] pl-[20px] bg-[#263238] rounded-t-[10px]">
        <p className="text-[16px] text-white font-[500] leading-[22px]">
          Payment method
        </p>
      </div>

      <div className="pl-[20px] pr-[12px] pt-[20px] pb-[15px] bg-white rounded-b-[10px] timeoff-shadow">
        <div>
          <p className="text-[16px] font-[500] leading-[22px] mb-[15px]">
            Select Payment
          </p>
          <PaymentOption
            datas={paymentMethodData}
            selectedOption={selectedOption}
            setSelectedOptions={setSelectedOptions}
          />
        </div>

        {selectedOption?.value === 'bkash' && (
          <PaymentSubInput
            type="number"
            value={input?.number}
            onKeyDown={(e) => formatNumberInput(e)}
            onChange={(e) => setInput({ ...input, number: e.target.value })}
            placeholder={'Enter your bkash number'}
          />
        )}

        <div className={`w-full mt-[20px]`}>
          {selectedOption?.value === 'bank' ? (
            <Button
              onClick={() => setOpenBankModal(true)}
              className={`w-full !text-[14px] !py-[15px] rounded-[5px]`}
            >
              Give your bank infromation
            </Button>
          ) : (
            <Button
              onClick={handleUpdatePyamentMethod}
              className={`w-full !text-[14px] !py-[15px] rounded-[5px]`}
              disabled={selectedOption.value === '' || input.number === '' || loading}
              loading={loading}
              loadingText={'Updating'}
            >
              Update payment method
            </Button>
          )}
        </div>

        <BankDetailsModal
          open={openBankModal}
          setOpen={setOpenBankModal}
          selectedOption={selectedOption}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          input={input}
          setInput={setInput}
          paymentMethodUpdateAPI={paymentMethodUpdateAPI}
        />

      </div>
    </div>
  );
};

export default PaymentMethod;
