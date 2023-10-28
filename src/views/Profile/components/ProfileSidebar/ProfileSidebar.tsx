import Button from '@components/Button';
import PostCompletedIcon from '@components/Icons/PostCompletedIcon';
import SalaryIcon from '@components/Icons/SalaryIcon';
import TeamMembersIcon from '@components/Icons/TeamMembersIcon';
import { useAppSelector } from '@hooks/useRedux';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ProfileSidebarStatBox from '../ProfileSidebarStatBox';

type Props = {
  salaryAmount: any;
};

const ProfileSidebar = ({ salaryAmount }: Props) => {
  const { auth } = useAppSelector((state) => state);
  const { user } = auth;

  const completeTask = user?.tasks?.filter(
    (e: any) => e.status === 'Approved' || e.status === 'Approved Late'
  );

  const router = useRouter();
  return (
    <aside>
      <div className="w-[140px] h-[140px] lg:w-[204px] lg:h-[204px] rounded-full bg-white flex justify-center items-center mx-auto -mb-[70px] lg:-mb-[102px] timeoff-shadow">
        <div className="w-[100px] h-[100px] lg:w-[170px] lg:h-[170px] rounded-full overflow-hidden relative ">
          <Image
            src={user?.avatar || '/images/profile-avatar.jpg'}
            alt="profile-avatar"
            layout="fill"
            className="object-cover"
          />
        </div>
      </div>

      <div className="bg-white rounded-[10px] md:rounded-[16px] xl:rounded-[24px] pt-[75px] lg:pt-[116px] timeoff-shadow">
        <div className="px-6 text-center">
          <h2 className="text-[24px] lg:text-[30px] leading-[40px] font-semibold text-[#1D1D1D] text-ellipsis overflow-hidden" title={user?.username + `(${user?.firstName})` || `user01(AAAA)`}>
            {user?.username + `(${user?.firstName})` || `user01(AAAA)`}
          </h2>
          <p className="text-base lg:text-[22px] leading-[35px] text-[#7B7B7B] lg:mt-1">
            {user?.email || `email@exemple.com`}
          </p>
        </div>
        <div className="px-6 3xl:px-[54px] mt-[46px] grid xl:grid-cols-2  grid-cols-2 lg:grid-cols-3 sm:grid-cols-3 md:gap-5 gap-3 3xl:gap-10">
          <ProfileSidebarStatBox
            icon={<TeamMembersIcon />}
            label="Working as"
            value={user?.workingAs || `Employee`}
          />
          {/* <ProfileSidebarStatBox
            icon={<HoursIcon />}
            label="This Week"
            value="40hrs+"
          />
          <ProfileSidebarStatBox
            icon={<CalanderIcon />}
            label="This Month"
            value="150hrs+"
          /> */}
          <ProfileSidebarStatBox
            icon={<PostCompletedIcon />}
            label="Task Completed"
            value={completeTask?.length}
          />
          <div className="xl:col-span-full sm:col-auto col-span-full">
            <ProfileSidebarStatBox
              icon={<SalaryIcon />}
              label="Monthly Salary"
              value={`$${salaryAmount}`}
              className="xl:!flex-row !flex-col  xl:!py-12 py-6 !justify-center  xl:!gap-[50px] "
            />
          </div>
        </div>
        <div className="py-8 px-6 3xl:px-[54px]">
          <Button
            className="w-full"
            onClick={() => router.push('/dashboard/settings')}
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </aside>
  );
  // "3xl:flex-row xl:flex-col 3xl:py-12 xl:py-6 3xl:justify-center 3xl:gap-[50px]"
};

export default ProfileSidebar;
