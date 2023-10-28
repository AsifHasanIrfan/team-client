import Link from 'next/link';
import React from 'react';

type Props = {
  link: string;
  children: any;
}

const SocialLinks = ({ link, children }: Props) => {
  return (
    <div>
      <Link href={link ? link : '#'} passHref>
        <a className="group w-[50px] block relative" target={'_blank'}>
          {children}
          <span className="absolute top-0 left-0 h-full w-full bg-transparent group-hover:bg-black/20 duration-150 rounded-full"></span>
        </a>
      </Link>
    </div>
  );
};

export default SocialLinks;