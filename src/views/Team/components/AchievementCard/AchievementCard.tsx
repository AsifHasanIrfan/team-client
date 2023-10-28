import moment from 'moment-timezone';
import Image from 'next/image';
import React from 'react';

type Props = {
    data: any;
}

const AchievementCard = ({ data }: Props) => {
    return (
      <div className="flex gap-[16px]">
        <div className="w-[40px] h-[40px]">
          <Image
            src={data?.imgUrl}
            width={100}
            height={100}
            alt="achievement"
            className="rounded-full"
          />
          {/* {index === 0 && <BadgeOne />}
                {index === 1 && <BadgeTwo />}
                {index === 2 && <BadgeThree />} */}
        </div>
        <div>
          <p className="text-[12px] mb-[2px]">{data?.title}</p>
          <p className="text-[12px] text-[#8B979F]">
            {moment(data?.date).tz(moment.tz.guess()).format('MMMM YYYY')}
          </p>
        </div>
      </div>
    );
};

export default AchievementCard;