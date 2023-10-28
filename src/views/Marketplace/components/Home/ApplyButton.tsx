const ApplyButton = ({ children, variant, className, onClick }: any) => {
  return (
    <button
      className={`md:py-[10px] py-[8px] md:px-[35px] px-[20px] rounded-[72px] border font-[500] md:text-[15px] text-[12px]  hover:border-lightHover hover:text-white hover:bg-primary ransition-all duration-300 ${className} ${
        variant === 'apply'
          ? 'text-primary border-primary '
          : 'border-[#1D1D1D]'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ApplyButton;
