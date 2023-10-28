import Button from '@components/Button';
import Input from '@components/Input';
import Modal from '@components/Modal';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

type Props = {
  token: any;
  open: any;
  setOpen: any;
  conversionId: any;
  conversionRefetch: Function;
  dbCurrency: {
    _id?: any;
    USD: number;
    BDT: number;
    EUR: number;
    INR: number;
  };
};

const ConversionModal = ({
  open,
  setOpen,
  conversionRefetch,
  dbCurrency,
  conversionId,
  token
}: Props) => {

  // states
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState<any>({
    usd: 0,
    bdt: 0,
    eur: 0,
    inr: 0,
  });

  useEffect(() => {
    setCurrency({
      usd: dbCurrency.USD,
      bdt: dbCurrency.BDT,
      eur: dbCurrency.EUR,
      inr: dbCurrency.INR,
    });
  }, [dbCurrency]);

  const handleOnChange = (event: any) => {
    setCurrency((prev: object) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleConversionSubmit = async (e: any) => {
    e.preventDefault();

    if (currency.usd || currency.bdt || currency.eur || currency.inr) {
      setLoading(true);
      const { data } = await axios.patch(
        `${process.env.serverUrl}conversion/${conversionId}`, { ...currency }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false);
      if (data.success === true) {
        toast.success(data.message);
        conversionRefetch();
        setOpen(false);
      }

      if (data.success === false) {
        toast.error(data.message);
      }
    } else {
      toast.error('You have to provide all currency values');
    }
  };

  return (
    <Modal setOpen={setOpen} open={open} title="Coversion">
      <div className="w-[330px] md:w-[500px] xl:w-[850px] overflow-hidden">
        <form
          className="font-primary space-y-[18px]"
          onSubmit={handleConversionSubmit}
        >
          <div>
            <div className="grid grid-cols-1 gap-x-5">
              <Input
                label={`USD`}
                placeholder={`00`}
                type={`number`}
                isRequired={true}
                name="usd"
                mainCss="-mb-1"
                onChange={handleOnChange}
                value={currency.usd}
                isDisabled={true}
              />
              <Input
                label={`BDT`}
                placeholder={`00`}
                type={`number`}
                isRequired={true}
                name="bdt"
                mainCss="-mb-1"
                onChange={handleOnChange}
                value={currency.bdt}
              />
              <Input
                label={`EUR`}
                placeholder={`00`}
                type={`number`}
                isRequired={true}
                name="eur"
                mainCss="-mb-1"
                onChange={handleOnChange}
                value={currency.eur}
              />
              <Input
                label={`INR`}
                placeholder={`00`}
                type={`number`}
                isRequired={true}
                name="inr"
                mainCss="-mb-1"
                onChange={handleOnChange}
                value={currency.inr}
              />
            </div>
          </div>

          <div className="flex items-center justify-end !mt-5">
            <Button
              rounded="md"
              loading={loading}
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

export default ConversionModal;
