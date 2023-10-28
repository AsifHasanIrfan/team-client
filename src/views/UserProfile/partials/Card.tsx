import { cx } from '@config/constants';
import React from 'react';

type CardProps = {
  children: React.ReactNode;
  wAuto?: any;
};

const Card: React.FC<CardProps> = ({ children, wAuto }) => {
  return (
    <div className="w-auto h-fit  flex flex-col p-[30px] rounded-[20px] tasksPage-shadow bg-[#FFFFFF] gap-y-[15px]">
      {children}
    </div>
  );
};
export default Card;
