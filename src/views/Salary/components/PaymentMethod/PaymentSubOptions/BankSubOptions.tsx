const BankSubOptions: React.FC = () => {
  return (
    <div className="mt-[15px]">
      <p className="text-[16px] font-[500] leading-[22px] mb-[15px]">
        Select Bank
      </p>
      <div className="rounded-[10px] px-[15px] py-[12px] border-[#E9EBEB] border-2 flex items-center">
        <input
          type="text"
          className="w-full px-3 py-1.5 text-sm font-normal border-none focus:outline-none"
          placeholder="Enter your bank"
        />
      </div>
    </div>
  );
};
export default BankSubOptions;
