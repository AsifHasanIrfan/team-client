import BenefitEditModal from '@views/AddBenefits/partials/BenefitEditModal/BenefitEditModal';
import Image from 'next/image';
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi';

type Props = {
  benefits: any;
};

const BenefitCard = ({ benefits }: Props) => {
  return (
    <>
      {benefits?.map((item: any, index: number) => (
        <Card key={index} item={item} />
      ))}
    </>
  );
};

function Card({ item }: any) {
  const [open, setOpen] = useState(false);

  return (
    <li className="my-5 flex items-center md:gap-8 lg:gap-[75px] xl:gap-[30px] 2xl:gap-5 justify-between bg-[#F8F8F8] rounded-[15px] border-l-[5px] lg:border-l-[10px] xl:border-l-[7px] 2xl:border-l-[10px] border-primary p-2.5 lg:p-8 xl:p-5 2xl:px-10 2xl:py-[30px]">
      <div className="flex items-center gap-2.5 md:gap-4 2xl:gap-6">
        <div className="shrink-0 w-[60px] h-[55px] md:w-[70px] md:h-[65px] lg:w-[120px] lg:h-[80px] xl:h-[80px] xl:w-[150px] 2xl:h-[90px] relative">
          <Image
            src={item?.imgUrl}
            alt="benefit_image"
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </div>
        <div>
          <h3 className="text-sm md:text-base lg:text-[26px] 2xl:text-3xl font-semibold text-[#1D1D1D]">
            {item?.title}
          </h3>
          <p className="text-[10px] lg:text-lg xl:text-sm 2xl:text-xs font-normal text-[#8B979F] mt-1.5">
            {item?.subDescription ? item.subDescription : 'I am DG benefit with no description.'}
          </p>
        </div>
      </div>
      <div>
        <span
          onClick={() => setOpen(true)}
          className="flex group cursor-pointer items-center gap-[9px] text-[16px] "
        >
          <FiEdit className="text-[16px] group-hover:text-primary transition ease-in-out duration-300" />
          <span className="text-[16px] font-medium group-hover:text-primary transition ease-in-out duration-300">
            Edit
          </span>
        </span>
        <BenefitEditModal open={open} setOpen={setOpen} data={item} />
      </div>
    </li>
  );
}
export default BenefitCard;
