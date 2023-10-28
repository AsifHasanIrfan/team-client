import React from 'react';

type HeadingProps = {
  children: any;
};

const CardHeader: React.FC<HeadingProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-between gap-10">
      <h2 className="w-auto text-[22px] font-medium leading-[30px] cursor-pointer hover:text-lightHover transition ease-in-out duration-300">
        {children}
      </h2>
    </div>
  );
};
export default CardHeader;
