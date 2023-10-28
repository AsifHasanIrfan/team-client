import { timeoffTabDatas } from '@config/constants';
import React from 'react';

const ModalNav = ({
  openTab,
  setOpenTab,
}: {
  openTab: number;
  setOpenTab: (openTab: number) => void;
}) => {
  return (
    <div className="flex items-center gap-[20px] mb-[20px]">

      {timeoffTabDatas.map((item, index) => <button key={index}
        className={`md:text-[14px] text-[12px] border border-[#bdc3c7] hover:border-primary p-[15px] rounded-[10px] outline-none transition ease-in-out duration-300
                  ${openTab === item.tab
            ? 'bg-primary md:hover:bg-lightHover text-white hover:drop-shadow-lg'
            : 'bg-[#f7f8fa] text-[#1d1d1d] hover:text-primary'
          }`}
        onClick={(e) => {
          e.preventDefault();
          setOpenTab(item.tab);
        }}
        data-toggle="tab"
        role="tablist"
      >
        {item.label}
      </button>)}
    </div>
  );
};

export default ModalNav;
