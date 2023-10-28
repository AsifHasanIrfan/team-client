import { ProfileStatCardProps } from '@config/types';

const ProfileStatCard = ({ icon, label, value }: ProfileStatCardProps) => {
  return (
    <div className="bg-white rounded-[10px] md:rounded-[16px] xl:rounded-[24px] py-5 px-5 w-full timeoff-shadow">
      <div className="grid grid-cols-[50px,140px] w-fit mx-auto md:w-full md:flex md:justify-center md:flex-col md:items-center gap-6 md:gap-4 flex-row">
        <div className="max-w-[50px] lg:max-w-[60px]">{icon}</div>
        <div className="text-center">
          <p className="text-[16px] lg:text-[22px] md:leading-[40px] text-[#7B7B7B]">
            {label}
          </p>
          <h6 className="text-[24px] lg:text-[32px] font-medium leading-[40px] text-[#1D1D1D]">
            {value}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default ProfileStatCard;
