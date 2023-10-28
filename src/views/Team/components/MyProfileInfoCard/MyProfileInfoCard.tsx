import BehanceIcon from '@components/Icons/BehanceIcon';
import DribbleIcon from '@components/Icons/DribbleIcon';
import Facebook from '@components/Icons/Facebook';
import FiverrIcon from '@components/Icons/fiverrIcon';
import Github from '@components/Icons/Github';

import LinkDefault from '@components/Icons/LinkDefault';
import LinkedIn from '@components/Icons/LinkedIn';
import UpworkIcon from '@components/Icons/upworkIcon';
import SocialLinks from '@views/Team/partials/SocialLinks';
import Image from 'next/image';
import AchievementCard from '../AchievementCard';

type SocialProps = {
  name: string;
  value: string;
};

const MyProfileInfoCard = ({ data }: any) => {
  let socialLinks: SocialProps[] = [];

  const completeTask = data?.tasks?.filter(
    (e: any) => e.status === 'Approved' || e.status === 'Approved Late'
  );

  const progressbar = (completeTask?.length / data?.tasks?.length) * 100;

  // if there is data pushing to array
  if (data.facebook) socialLinks.push({ name: 'facebook', value: data.facebook });
  if (data.linkedin) socialLinks.push({ name: 'linkedin', value: data.linkedin });
  if (data.github) socialLinks.push({ name: 'github', value: data.github });
  if (data.fiverr) socialLinks.push({ name: 'fiverr', value: data.fiverr });
  if (data.upwork) socialLinks.push({ name: 'upwork', value: data.upwork });
  if (data.dribble) socialLinks.push({ name: 'dribble', value: data.dribble });
  if (data.behance) socialLinks.push({ name: 'behance', value: data.behance });
  if (data.others) socialLinks.push({ name: 'others', value: data.others });

  return (
    <div className="bg-white rounded-[20px] md:mt-0 mt-[30px] shadow-[0px_0px_36px_rgba(0, 0, 0, 0.05)] ">
      {/* top info */}
      <div className="flex items-center xl:items-start gap-[16px] p-[24px_24px_0_24px]">
        <div className="max-w-[60px] max-h-[60px]">
          <Image
            className="rounded-[50%]"
            src={`${
              data?.avatar ? data.avatar : '/images/leaderboard-profile.jpg'
            }`}
            width={100}
            height={100}
            alt="leaderboard-profile"
          />
        </div>
        <div>
          <p className="text-[16px] font-medium">
            {data.firstName
              ? data?.firstName + ' ' + data?.lastName
              : 'Please update your name'}
          </p>
          <p className="text-[14px] text-[#8B979F] my-[8px]">
            {data?.designation}
          </p>
          <p className="text-[12px] text-[#8B979F]">
            {data?.bio
              ? data.bio.slice(0, 60)
              : 'I am a DG member with no status!'}
          </p>
        </div>
      </div>
      {/* top info */}

      <div className="border-t my-[24px]"></div>

      {/* bottom info */}
      <div className="p-[0px_24px_24px_24px]">
        <div className="mb-[16px]">
          <p className="text-[14px] font-medium">Achievements</p>
        </div>
        <div
          className={`flex flex-col gap-[21px] max-h-[180px] ${
            data?.achievements?.length > 2 && 'overflow-y-scroll scrolbar'
          }`}
        >
          {data?.achievements?.length === 0 ? (
            <p className="text-center text-primary">No achievement earned!</p>
          ) : (
            <>
              {data?.achievements?.map((item: any) => (
                <AchievementCard data={item} key={item._id} />
              ))}
            </>
          )}
        </div>

        {/* Project Activity --Start-- */}
        <div className="relative w-full h-8 overflow-hidden rounded-lg bg-primary my-[25px]">
          <div
            className="h-full bg-black w-full text-white"
            style={{
              width: `${completeTask?.length === 0 ? '0' : progressbar}%`,
            }}
          ></div>
          <div className="absolute top-[6px] flex gap-[8px] px-[15px] items-center">
            <p className={`text-[10px] text-white`}>Task Activity</p>
            <p className="text-sm font-semibold text-white">
              {completeTask?.length === 0 ? 0 : progressbar?.toFixed(2)}%
            </p>
          </div>
        </div>
        {/* Project Activity --End-- */}

        {/* Social Links --Start-- */}
        {/* <div className="!px-[15px]"> */}
        <div className="w-full">
          <div className="flex flex-wrap justify-center gap-[13px] gap-y-[20px]">
            {socialLinks.length
              ? socialLinks.map((item: SocialProps, index: number) => (
                  <SocialLinks link={item.value} key={index}>
                    {item.name === 'facebook' ? (
                      <Facebook />
                    ) : item.name === 'linkedin' ? (
                      <LinkedIn />
                    ) : item.name === 'github' ? (
                      <Github />
                    ) : item.name === 'behance' ? (
                      <BehanceIcon />
                    ) : item.name === 'dribble' ? (
                      <DribbleIcon />
                    ) : item.name === 'fiverr' ? (
                      <FiverrIcon />
                    ) : item.name === 'upwork' ? (
                      <UpworkIcon />
                    ) : (
                      <LinkDefault />
                    )}
                  </SocialLinks>
                ))
              : ''}
          </div>
        </div>

        {/* Social Links --End-- */}
      </div>
      {/* bottom info */}
    </div>
  );
};

export default MyProfileInfoCard;
