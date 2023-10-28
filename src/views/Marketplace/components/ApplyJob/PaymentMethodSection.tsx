import {
  paymentMethodOptions,
  selectInputStyle,
} from '@views/Marketplace/constants';
import Select from 'react-select';

type PropsTypes = {
  setSelectedPaymentMethod: any;
  selectedPaymentMethod: any;
  paymentMethodUrl: any;
  setPaymentMethodUrl: any;
};

const PaymentMethodSection = ({
  setSelectedPaymentMethod,
  selectedPaymentMethod,
  setPaymentMethodUrl,
  paymentMethodUrl,
}: PropsTypes) => {

  const handleFiInput = (e: any) => {
    setPaymentMethodUrl({
      label: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <div className="pb-[20px] md:flex items-center gap-[30px]">
      <div>
        <label htmlFor="payment-methods" className="font-[500] text-[18px]">
          Choose a payment methood
        </label>
        <div className="md:w-[330px] w-full mt-[15px]">
          <Select
            id="payment-methods"
            options={paymentMethodOptions}
            defaultValue={paymentMethodOptions[0]}
            value={selectedPaymentMethod}
            onChange={(option: any) => setSelectedPaymentMethod(option)}
            styles={selectInputStyle}
            isSearchable={false}
          />
        </div>
      </div>
      {selectedPaymentMethod?.value === 'fiverr' && (
        <div className="md:pt-0 pt-[20px]">
          <label htmlFor="payment-methods" className="font-[500] text-[18px]">
            Enter your Fiverr profile URL
          </label>
          <div className="w-[330px] mt-[15px]">
            <input
              type='text'
              name="fiverrUrl"
              placeholder="Fiverr Profile URL"
              className="bg-white w-[330px] outline-none py-[11px] px-[20px] border border-[#E0E0E0] rounded-[8px]"
              value={paymentMethodUrl.value}
              onChange={handleFiInput}
            />
          </div>
        </div>
      )}
      {selectedPaymentMethod?.value === 'upwork' && (
        <div className="md:pt-0 pt-[20px]">
          <label htmlFor="payment-methods" className="font-[500] text-[18px]">
            Enter your Upwork profile URL
          </label>
          <div className="w-[330px] mt-[15px]">
            <input
              type="text"
              name="upworkUrl"
              placeholder="Upwork Profile URL"
              className="bg-white w-[330px] outline-none py-[11px] px-[20px] border border-[#E0E0E0] rounded-[8px]"
              value={paymentMethodUrl.value}
              onChange={handleFiInput}
            />
          </div>
        </div>
      )}
      {selectedPaymentMethod?.value === 'localBank' && (
        <div className="md:pt-0 pt-[20px]">
          <label htmlFor="payment-methods" className="font-[500] text-[18px]">
            Enter your local bank number
          </label>
          <div className="w-[330px] mt-[15px]">
            <input
              type="number"
              name="localBank"
              placeholder="Enter Bank Number"
              className="bg-white w-[330px] outline-none py-[11px] px-[20px] border border-[#E0E0E0] rounded-[8px]"
              value={paymentMethodUrl.value}
              onChange={handleFiInput}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSection;
