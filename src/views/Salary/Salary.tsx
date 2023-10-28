import { useAuth } from '@state/index';
import React, { useState, useEffect } from 'react';

import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useGetConversion from '@hooks/useGetConversion';
import { useAppSelector } from '@hooks/useRedux';
import useSalaryInfo from '@hooks/useSalaryInfo';
import Converter from './components/Converter/Converter';
import DrawbackTable from './components/DrawbackTable/DrawbackTable';
import PaymentMethod from './components/PaymentMethod/PaymentMethod';
import CreateSalaryModal from './components/SalaryTable/CreateSalaryModal';
import SalaryDataTable from './components/SalaryTable/SalaryDataTable';
import ThisMonthSalaryInfo from './components/ThisMonthSalary/ThisMonthSalaryInfo';
import AdminButtons from './partials/AdminButtons';
import ConversionModal from './partials/ConversionModal';
import TableHeader from './partials/TableHeader/TableHeader';

const Salary: React.FC = () => {
  // global states
  const { auth } = useAppSelector((state) => state);
  const { isAdmin } = useAuth();

  // hooks
  const { salaryInfo, salaryInfoLoading } = useSalaryInfo(auth?.token, auth?.user?._id);
  const { conversions, conversionLoading, conversionRefetch } = useGetConversion(auth?.token);

  // states
  const [open, setOpen] = useState(false);
  const [coversionOpen, setCoversionOpen] = useState(false);
  const [filterBy, setFilterBy] = useState('');
  const [value, setValue] = useState('');
  const [exchangeValues, setExchangeValues] = useState({ BDT: 0, USD: 0, INR: 0, EUR: 0 });

  useEffect(() => {
    setExchangeValues({
      BDT: conversions?.data?.bdt,
      EUR: conversions?.data?.eur,
      INR: conversions?.data?.inr,
      USD: conversions?.data?.usd
    })
  }, [conversions?.data])

  // loader
  if (!auth.token || conversionLoading || salaryInfoLoading) return <FullPageLoader />;

  return (
    <>
      <AdminButtons
        setOpen={setOpen}
        setCoversionOpen={setCoversionOpen}
        isAdmin={isAdmin}
      />

      <div className="salary__page space-y-[30px] xl:space-y-0 xl:flex xl:gap-[30px] w-full">
        <div className="flex-auto">
          <div
            className={`bg-white px-3 pb-5 timeoff-shadow rounded-[15px] ${auth?.user?.role === 'admin' ? 'pt-3' : 'pt-5'
              }`}
          >
            {isAdmin && (
              <TableHeader
                setFilterBy={setFilterBy}
                filterBy={filterBy}
                value={value}
                setValue={setValue}
              />
            )}
            <SalaryDataTable filterBy={filterBy} value={value} />
          </div>

          {/* {!isAdmin && ( */}
          <div className="bg-white px-3 py-5 timeoff-shadow rounded-[15px] mt-[20px]">
            <DrawbackTable />
          </div>
          {/* )} */}
        </div>

        <div className="space-y-[30px] md:flex md:flex-col xl:block">
          {/* salary information */}
          <div className="flex flex-col md:flex-row gap-[30px] xl:flex-col">
            <ThisMonthSalaryInfo
              data={salaryInfo?.datas}
              loading={salaryInfoLoading}
            />
          </div>

          {/* payment method and converter */}
          <div className="flex flex-col md:flex-row gap-[30px] xl:flex-col">
            <PaymentMethod token={auth.token} userId={auth?.user?._id} />
            <Converter usdExchangeValues={exchangeValues} />
          </div>
        </div>
      </div>

      <CreateSalaryModal open={open} setOpen={setOpen} />

      <ConversionModal
        token={auth?.token}
        open={coversionOpen}
        setOpen={setCoversionOpen}
        dbCurrency={exchangeValues}
        conversionRefetch={conversionRefetch}
        conversionId={conversions?.data?._id}
      />
    </>
  );
};

export default Salary;
