import React from 'react';

type Props = {
  filterValueTab: string;
  setFilterValueTab: (filterValueTab: string) => void;
};

const DailyTask: React.FC<Props> = ({ filterValueTab, setFilterValueTab }) => {
  return (
    <div className="flex gap-[15px] py-4 px-1">
      <button
        type="button"
        onClick={() => setFilterValueTab('daily')}
        className={`lg:text-xl lg:text-[22px] md:text-xl text-xs outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${filterValueTab === 'daily' && '!text-darkHover'} }`}
      >
        Current Tasks
      </button>
      <button
        type="button"
        onClick={() => setFilterValueTab('Completed')}
        className={`lg:text-[22px] md:text-xl text-xs  outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${filterValueTab === 'Completed' && ' !text-darkHover '
          } }`}
      >
        Completed
      </button>
      <button
        type="button"
        onClick={() => setFilterValueTab('Approved')}
        className={`lg:text-[22px] md:text-xl text-xs  outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${filterValueTab === 'Approved' && ' !text-darkHover '
          } }`}
      >
        Approved
      </button>
      <button
        type="button"
        onClick={() => setFilterValueTab('Approved Late')}
        className={`lg:text-[22px] md:text-xl text-xs  outline-none font-medium text-[#CCCCCC] hover:text-darkHover transition ease-in-out duration-300 ${filterValueTab === 'Approved Late' && ' !text-darkHover'
          } }`}
      >
        Approved Late
      </button>
    </div>
  );
};
export default DailyTask;
