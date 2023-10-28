import { ContactInfoCardProps } from '@config/types';

const ContactInfoCard = ({ content, icon, title }: ContactInfoCardProps) => {
  return (
    <div className="bg-white rounded-lg flex flex-col justify-center items-center gap-5 md:gap-4 lg:gap-[25px] py-[45px] md:py-5 lg:py-[50px]">
      <div className="w-[60px] h-[60px] rounded-lg flex items-center justify-center bg-[#FFE5EB] text-primary">
        {icon}
      </div>
      <p className="text-[20px] md:text-[16px] xl:text-[20px] leading-[125%] text-[#1D1D1D]">
        {title}
      </p>
      <div className="text-[24px] md:text-[15px] lg:text-[24px] font-medium leading-[125%] text-[#1D1D1D] text-center">
        {content}
      </div>
    </div>
  );
};

export default ContactInfoCard;
