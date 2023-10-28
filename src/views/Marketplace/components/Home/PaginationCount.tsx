const PaginationCount = ({ children, className }: any) => {
  return (
    <div
      className={`rounded-[4px] text-center w-[33px] h-[32px] flex items-center justify-center cursor-pointer border border-[#DADADA] font-[600] ${className}`}
    >
      {children}
    </div>
  );
};

export default PaginationCount;
