import { careerOptionsData } from '@config/constants';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  openTab: string;
  setOpenTab: Dispatch<SetStateAction<string>>;
};

const CareerOptions = ({ openTab, setOpenTab }: Props) => {
  return (
    <div className="flex lg:justify-between justify-center lg:flex-nowrap flex-wrap lg:gap-y-0 md:gap-y-[25px] gap-y-4 md:gap-x-[25px] lg:gap-x-2 gap-x-4 mt-[50px]">
      {careerOptionsData.map((item) => (
        <button
          key={item.tabNumber}
          className={`
          __careerOptionsGsap opacity-0 translate-y-20 md:text-[14px] text-[12px] border border-[#bdc3c7] hover:border-primary md:px-[45px] p-[15px] md:py-[20px] rounded-full outline-none
                    ${
                      openTab === item.title
                        ? 'bg-primary md:hover:bg-lightHover text-white hover:drop-shadow-lg'
                        : 'bg-[#f7f8fa] text-[#1d1d1d] hover:text-primary'
                    }`}
          onClick={(e) => {
            e.preventDefault();
            setOpenTab(item.title);
          }}
          data-toggle="tab"
          role="tablist"
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default CareerOptions;
