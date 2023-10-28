import Button from '@components/Button';
import Input from '@components/Input';
import Modal from '@components/Modal';
import { countryOptionsData, paymentMethodData } from '@config/constants';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import CountryOptions from '../CountryOptions/CountryOptions';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  input: any;
  setInput: any;
  selectedOption: any;
  selectedCountry: any;
  setSelectedCountry: (selectedCountry: any) => void;
  paymentMethodUpdateAPI: any;
};
// select country
// bank name
// account name
// account number
// district name
// branch

const BankDetailsModal = ({ open, setOpen, input, setInput, selectedCountry, setSelectedCountry, selectedOption, paymentMethodUpdateAPI }: Props) => {

  // states
  const [loading, setLoading] = useState(false);

  // update payment method api
  const handlePaymentMethod = (e: any) => {
    e.preventDefault();

    if (selectedOption.value === '') {
      toast.error('Please choose payment type!');
      return;
    }

    // checking is value given when value select as bank
    if (selectedOption.value === 'bank') {
      if (input.number === '' || input.accountName === '' || input.districtName === '' || input.branchName === '' || input.bankName === '' || selectedCountry.value === '') {
        toast.error('Please fill all payment field!');
        return;
      }
    }

    // send data and api call
    const data = { ...input, name: selectedOption.value, country: selectedCountry.value }
    paymentMethodUpdateAPI(data, setLoading)
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Bank Details">
      <div className="w-[330px] md:w-[500px] xl:w-[850px] overflow-hidden">
        <form
          className="font-primary space-y-[18px]"
          onSubmit={handlePaymentMethod}
        >
          <div>
            <div className="grid grid-cols-1 gap-x-5">

              <div className="mb-[20px]">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                  Select country
                </h2>
                <CountryOptions
                  datas={countryOptionsData}
                  selectedOption={selectedCountry}
                  setSelectedOptions={setSelectedCountry}
                />
              </div>

              <Input
                label="Bank Name"
                placeholder="Enter your bank name"
                type="string"
                isRequired={true}
                name="bankName"
                mainCss="-mb-1"
                onChange={(e: any) => setInput({ ...input, bankName: e.target.value })}
                value={input?.bankName}
              />

              <Input
                label="Account Name"
                placeholder="Enter your bank account name"
                type="string"
                isRequired={true}
                name="accountName"
                mainCss="-mb-1"
                onChange={(e: any) => setInput({ ...input, accountName: e.target.value })}
                value={input?.accountName}
              />

              <Input
                label="Account Number"
                placeholder="Enter your bank account number"
                type="number"
                isRequired={true}
                name="accountNumber"
                mainCss="-mb-1"
                onChange={(e: any) => setInput({ ...input, number: e.target.value })}
                value={input?.number}
              />

              <Input
                label="District"
                placeholder="Enter your district name"
                type="string"
                isRequired={true}
                name="district"
                mainCss="-mb-1"
                onChange={(e: any) => setInput({ ...input, districtName: e.target.value })}
                value={input?.districtName}
              />

              <Input
                label="Branch"
                placeholder="Enter your branch name"
                type="string"
                isRequired={true}
                name="branch"
                mainCss="-mb-1"
                onChange={(e: any) => setInput({ ...input, branchName: e.target.value })}
                value={input?.branchName}
              />

            </div>
          </div>

          <div className="flex items-center justify-end !mt-5">
            <Button
              rounded="md"
              loading={loading}
              disabled={loading}
              loadingText={'Updating'}
            >
              Update
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BankDetailsModal;
