import { ProfileStatCardProps } from '@config/types';

const ProfileSidebarStatBox = ({
  icon,
  label,
  value,
  className,
}: ProfileStatCardProps) => {
  return (
    <div
      className={`border border-[#D9D9D9] rounded-[16px] py-[14px] 3xl:py-6 px-3 3xl:px-5 flex flex-col items-center text-center  ${className}`}
    >
      <div className="max-w-[50px] lg:max-w-[60px]">{icon}</div>
      <div className="flex flex-col justify-center items-center">
        <p
          className={`sm:text-sm text-[12px] 3xl:text-base text-[#7B7B7B] mt-[15px] w-max text-center ${
            className ? '3xl:mt-[0px]' : '3xl:mt-[30px]'
          } `}
        >
          {label}
        </p>
        <h6 className="sm:text-base text-sm 3xl:text-xl font-medium text-[#1D1D1D] w-max text-center">
          {value}
        </h6>
      </div>
    </div>
  );
};

export default ProfileSidebarStatBox;
