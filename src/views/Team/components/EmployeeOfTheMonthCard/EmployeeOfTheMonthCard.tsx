import BadgeEight from '@components/Icons/Badge/BadgeEight';
import BadgeFive from '@components/Icons/Badge/BadgeFive';
import BadgeFour from '@components/Icons/Badge/BadgeFour';
import BadgeNine from '@components/Icons/Badge/BadgeNine';
import BadgeSeven from '@components/Icons/Badge/BadgeSeven';
import BadgeSix from '@components/Icons/Badge/BadgeSix';
import BadgeTen from '@components/Icons/Badge/BadgeTen';
import CoinIcon from '@components/Icons/CoinIcon';
import Bronze from '@components/Icons/Ribons/Bronze';
import Gold from '@components/Icons/Ribons/Gold';
import Sliver from '@components/Icons/Ribons/Sliver';
import DesignBadge from '@views/Team/partials/DesignBadge';
import Image from 'next/image';
import React from 'react';
var approx = require('approximate-number');

type Props = {
  data: any;
  index: number;
}

const EmployeeOfTheMonthCard = ({ data, index }: Props) => {
  return (
    <div className='rounded-lg border-l-[3px] border-primary bg-[#F3F3F3] flex items-center justify-between 3xl:p-[15px_8px] xl:px-[3px] xl:pr-[5px] p-[15px_8px]'>

      <div className='flex items-center xl:!gap-[4px] 3xl:!gap-[8px] !gap-4'>

        <div className='xl:pl-1 3xl:pl-0 pl-0 relative'>
          {
            index === 0 ? <Gold /> :
              index === 1 ? <Sliver /> :
                index === 2 ? <Bronze /> :
                  index === 3 ? <BadgeFour /> :
                    index === 4 ? <BadgeFive /> :
                      index === 5 ? <BadgeSix /> :
                        index === 6 ? <BadgeSeven /> :
                          index === 7 ? <BadgeEight /> :
                            index === 8 ? <BadgeNine /> :
                              index === 9 ? <BadgeTen /> : <>
                                <DesignBadge number={index + 1} />
                                <span className='text-white absolute top-[2px] text-[9px] left-[4px] xl:left-[7px] 3xl:left-[4px] font-bold'>{index + 1}</span>
                              </>
          }
        </div>

        <div className='flex items-center !gap-4 xl:!gap-[5px] 3xl:!gap-4 xl:ml-1 3xl:ml-0 ml-0'>
          <Image
            src={data?.avatar ? data.avatar : '/images/leaderboard-profile.jpg'}
            width={35}
            height={35}
            alt="profile-avatar"
            className='rounded-full'
          />
          <div>
            <h5 className="3xl:text-[14px] xl:text-[12px] text-[14px] 3xl:leading-[16px] text-black font-medium">
              {data?.name}
            </h5>
            <p className="3xl:text-[14px] xl:text-[12px] text-[14px] leading-[14px] text-[#8B979F] 2xl:mt-[7px] xl:mt-[4px] mt-[7px]">
              {data?.workingAs}
            </p>
          </div>
        </div>
      </div>

      <div className='flex items-center 3xl:gap-[5px] xl:gap-[3px] gap-[5px] xl:pr-[2px] 2xl:pr-2 3xl:pr-0'>
        <div className='w-[15px] h-[15px]'><CoinIcon /></div>
        <p className="3xl:text-[14px] xl:text-[12px] leading-[16px] text-black font-medium relative top-[1px]" title={data.coins}>
          {approx(data.coins)}
        </p>
      </div>
    </div>
  );
};

export default EmployeeOfTheMonthCard;               
