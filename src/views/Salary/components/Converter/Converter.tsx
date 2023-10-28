import ConverterChangeIcon from '@components/Icons/ConverterChangeIcon';
import ConverterInput from '@views/Salary/partials/ConverterInput';
import { useEffect, useState } from 'react';

const currencies = ['USD', 'BDT', 'EUR', 'INR'];

const Converter = ({ usdExchangeValues }: any) => {
  // states
  const [amount1, setAmount1] = useState(usdExchangeValues?.USD);
  const [amount2, setAmount2] = useState(usdExchangeValues?.BDT);
  const [coverterBgIcon, setConverterBgIcon] = useState<string>('#C10206');
  const [currency1, setCurrency1] = useState<any>('USD');
  const [currency2, setCurrency2] = useState<any>('BDT');

  useEffect(() => {
    setAmount1(usdExchangeValues?.USD);
    setAmount2(usdExchangeValues?.BDT);
    setCurrency1('USD');
    setCurrency2('BDT');
  }, [usdExchangeValues]);

  // ============= 1 ===========
  function handleAmount1Change(amount1: any) {
    const value = (
      (usdExchangeValues[currency2] / usdExchangeValues[currency1]) *
      amount1
    ).toFixed(2);
    setAmount1(amount1);
    setAmount2(Number(value));
  }

  function handleCurrency1Change(currency1: any) {
    setCurrency1(currency1);
    const value = (
      (usdExchangeValues[currency1] / usdExchangeValues[currency2]) *
      amount2
    ).toFixed(2);
    setAmount1(Number(value));
  }

  // ============= 2 =============
  function handleAmount2Change(amount2: any) {
    const value = (
      (usdExchangeValues[currency1] / usdExchangeValues[currency2]) *
      amount2
    ).toFixed(2);
    setAmount1(Number(value));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2: any) {
    const value = (
      (usdExchangeValues[currency2] / usdExchangeValues[currency1]) *
      amount1
    ).toFixed(2);
    setAmount2(Number(value));

    setCurrency2(currency2);
  }

  // ============ Swith Handper ==========
  function handleSwitch() {
    handleCurrency1Change(currency2);
    handleCurrency2Change(currency1);
  }

  return (
    <div className="currency_converter w-full lg:w-[50%] xl:w-[260px] 2xl:w-[540px] timeoff-shadow">
      <div className="py-[13px] pl-[20px] bg-[#263238] rounded-t-[10px]">
        <p className="text-[16px] text-white font-[500] leading-[22px]">
          Conversion
        </p>
      </div>

      <div className="pl-[20px] pr-[12px] pt-[20px] pb-[25px] bg-white rounded-b-[10px]">
        <p className="text-[16px] font-[500] leading-[22px] mb-[15px]">
          Enter Amount
        </p>

        <div>
          <ConverterInput
            currencies={currencies}
            amount={amount1}
            currency={currency1}
            onAmountChange={handleAmount1Change}
            onCurrencyChange={handleCurrency1Change}
          />

          <div
            className="w-[30px] h-[30px] cursor-pointer ml-[15px] mt-[-5px] mb-[-5px] relative z-[1000]"
            onClick={() => handleSwitch()}
            onMouseOver={() => setConverterBgIcon('#e7002e')}
            onMouseLeave={() => setConverterBgIcon('#C10206')}
          >
            <ConverterChangeIcon coverterBgIcon={coverterBgIcon} />
          </div>

          <ConverterInput
            currencies={currencies}
            amount={amount2}
            currency={currency2}
            onAmountChange={handleAmount2Change}
            onCurrencyChange={handleCurrency2Change}
          />
        </div>
      </div>
    </div>
  );
};

export default Converter;
