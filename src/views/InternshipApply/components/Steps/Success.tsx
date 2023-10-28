import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { applicationInfo } from '@state/index';

import Button from '@components/Button';
import { useInternshipInfo } from '@hooks/useInternshipInfo';

const Success = () => {
  const { setApplicationData } = useInternshipInfo();

  return (
    <div className="bg-white">
      <div className="flex items-center justify-center h-[100vh] flex-col">
        <div className="w-[180px] h-[180px]">
          <Image
            src="/images/apply/apply-success.svg"
            width={1}
            height={1}
            layout="responsive"
            alt="apply success"
          />
        </div>

        <h3 className="text-[28px] leading-[33px] mt-[40px] mb-[20px] font-[600] text-center">
          {' '}
          Your application has been submitted{' '}
        </h3>

        <p className="text-center mb-[40px] max-w-[400px] text-[21px] text-[#8b8b8b]">
          Out team will review your application and respond by email within 48
          hours
        </p>

        <Link href="/">
          <Button onClick={() => setApplicationData(applicationInfo.init)}>
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
