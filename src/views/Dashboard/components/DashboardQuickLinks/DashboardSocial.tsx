import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dashBoardSocialLinks } from '@config/constants';

const DashboardSocial: React.FC = () => {
  return (
    <div className="flex xl:gap-x-5 gap-x-3">
      {dashBoardSocialLinks.map(({ link, src }, i) => {
        return (
          <Link href={link} passHref key={i}>
            <a
              target="_blank"
              className="group relative max-w-[50px] rounded-full"
            >
              <Image src={src} width={50} height={50} alt="facebook" />
              <span className="absolute top-0 left-0 h-[87%] w-full bg-transparent group-hover:bg-black/20 duration-150 rounded-full"></span>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
export default DashboardSocial;
