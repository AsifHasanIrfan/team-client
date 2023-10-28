import Button from '@components/Button';
import CrownGoldIcon from '@components/Icons/CrownGoldIcon';
import { GetTeamAPIRequestDataTypeProp } from '@config/types';
import { useAppSelector } from '@hooks/useRedux';
import { useAuth } from '@state/index';
import Image from 'next/image';
import { useRouter } from 'next/router';

const LeaderboardCard = ({
  item,
  setOpen,
  setProfileData,
}: {
  item: GetTeamAPIRequestDataTypeProp;
  setOpen: any;
  setProfileData: any;
}) => {

  const router = useRouter();
  const { isAdmin } = useAuth();

  const { online } = useAppSelector((state) => state);
  const { _id, firstName, lastName, bio, designation, avatar, workingAs } = item;

  return (
    <div
      onClick={() => {
        setOpen(true);
        setProfileData(item);
      }}
      className="w-full"
    >
      <div className={`settingPage-login-setting rounded-lg md:rounded-[20px] bg-white border border-white hover:border-primary hover:primary-shadow duration-150 cursor-pointer relative flex flex-col md:items-center p-[15px] md:pt-[50px] md:px-6 md:pb-5 md:text-center ${!isAdmin ? 'md:min-h-[260px]' : 'md:min-h-[310px]'} min-h-[180px] overflow-hidden`}>
        {/* Team Leader Label */}
        {workingAs === 'Team Leader' && (
          <div className="bg-primary py-[5px] px-10 absolute top-[30px] right-[-40px] rotate-45">
            <div className="flex items-center gap-1 ">
              <div>
                <CrownGoldIcon />
              </div>
              <h3 className="uppercase text-white text-[12px] mt-[2px]">
                Team Leader
              </h3>
            </div>
          </div>
        )}
        {/* Active Badge --Start-- */}
        {online.includes(_id) ? (
          <div className="flex items-center self-start gap-2 md:absolute left-5 top-4">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <p className="text-xs text-[#263238]">Active</p>
          </div>
        ) : (
          <div className="flex items-center self-start gap-2 md:absolute left-5 top-4">
            <div className="w-2 h-2 bg-[#808080] rounded-full"></div>
            <p className="text-xs text-[#263238]">Offline</p>
          </div>
        )}
        {/* Active Badge --End-- */}

        <div className="flex flex-row gap-4 md:gap-0 md:flex-col items-center mt-5 md:mt-0">
          <div className="w-[100px] profile-info-card h-[100px] md:w-[70px] shrink-0 md:h-[70px] rounded-[10px] bg-slate-100 relative overflow-hidden">
            <Image src={`${avatar}`} layout="fill" alt="leaderboard-profile" />
          </div>
          <div className="flex flex-col md:items-center">
            <h5 className="text-[14px] md:text-[17px] md:leading-[19px] font-semibold md:mt-5">
              {firstName + ' ' + lastName}
            </h5>
            <p className="text-[10px] md:text-sm mt-1 text-[#8B979F]">
              {designation}
            </p>

            <p className="mt-2 md:mt-5 text-[10px] md:text-xs text-[#8B979F]">
              {' '}
              {bio ? bio.slice(0, 60) : 'I am a DG member with no status!'}{' '}
            </p>
          </div>

          {isAdmin ? <div className='mt-4'>
            <Button
              className="w-[200px] !py-2"
              onClick={() => router.push(`/dashboard/user/${_id}`)}
            >
              Edit Profile
            </Button>
          </div> : null}

        </div>
      </div>
    </div>
  );
};

export default LeaderboardCard;
