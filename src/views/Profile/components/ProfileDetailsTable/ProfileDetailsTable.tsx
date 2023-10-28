import { useAppSelector } from '@hooks/useRedux';

const ProfileDetailsTable = () => {
  const { auth } = useAppSelector((state) => state);
  const { user } = auth;
  return (
    <div className="rounded-[10px] md:rounded-[16px] xl:rounded-[24px] px-[15px] md:px-[25px] lg:px-[30px] py-5 md:py-[25px] xl:pb-[72px] bg-white timeoff-shadow">
      {/* full name */}
      <div className="flex justify-between gap-4 text-[18px] leading-[30px] lg:text-[24px] lg:leading-[40px] font-medium py-5 lg:py-[25px] border-b-2 border-[#F2F3F7] last:border-b-0 first:pt-0 last:pb-0">
        <p className="text-[#7B7B7B]">Full Name:</p>
        <p className="text-[#1D1D1D] line-clamp-1">
          {`${user?.firstName} ${user?.lastName}`}
        </p>
      </div>
      {/* username */}
      <div className="flex justify-between gap-4 text-[18px] leading-[30px] lg:text-[24px] lg:leading-[40px] font-medium py-5 lg:py-[25px] border-b-2 border-[#F2F3F7] last:border-b-0 first:pt-0 last:pb-0">
        <p className="text-[#7B7B7B]">Username:</p>
        <p className="text-[#1D1D1D] line-clamp-1">{user?.username}</p>
      </div>
      {/* phone number */}
      <div className="flex justify-between gap-4 text-[18px] leading-[30px] lg:text-[24px] lg:leading-[40px] font-medium py-5 lg:py-[25px] border-b-2 border-[#F2F3F7] last:border-b-0 first:pt-0 last:pb-0">
        <p className="text-[#7B7B7B]">Phone Number:</p>
        <p className="text-[#1D1D1D] line-clamp-1">
          {user?.phone ? `${user?.phone}` : `Add your number`}
        </p>
      </div>
      {/* address */}
      <div className="flex justify-between gap-4 text-[18px] leading-[30px] lg:text-[24px] lg:leading-[40px] font-medium py-5 lg:py-[25px] border-b-2 border-[#F2F3F7] last:border-b-0 first:pt-0 last:pb-0">
        <p className="text-[#7B7B7B]">Address:</p>
        <p className="text-[#1D1D1D] line-clamp-1">
          {user?.address ? `${user?.address}` : `Add your address`}
        </p>
      </div>
      {/* role */}
      <div className="flex justify-between gap-4 text-[18px] leading-[30px] lg:text-[24px] lg:leading-[40px] font-medium py-5 lg:py-[25px] border-b-2 border-[#F2F3F7] last:border-b-0 first:pt-0 last:pb-0">
        <p className="text-[#7B7B7B]">Role:</p>
        <p className="text-[#1D1D1D] line-clamp-1">
          {user?.designation ? `${user?.designation}` : `UI UX Designer`}
        </p>
      </div>
      {/* years of experience: */}
      <div className="flex justify-between gap-4 text-[18px] leading-[30px] lg:text-[24px] lg:leading-[40px] font-medium py-5 lg:py-[25px] border-b-2 border-[#F2F3F7] last:border-b-0 first:pt-0 last:pb-0">
        <p className="text-[#7B7B7B]">Years of Experience:</p>
        <p className="text-[#1D1D1D] line-clamp-1">
          {user?.experience ? `${user?.experience}` : `Add your experience`}{' '}
          Years
        </p>
      </div>
    </div>
  );
};

export default ProfileDetailsTable;
