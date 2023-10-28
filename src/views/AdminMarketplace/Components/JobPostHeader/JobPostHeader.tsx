import Button from '@components/Button';
import { useRouter } from 'next/router';
import React from 'react';

type Props = {
  setCreateProjectModalOpen: any;
  tabValue: string;
  setTabValue: (tabValue: string) => void;
};

const JobPostHeader = ({ setCreateProjectModalOpen, tabValue, setTabValue }: Props) => {
  const router = useRouter();
 
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-between">
      <div className="flex gap-[15px] py-4 col-span-2 px-1">
        <button
          type="button"
          onClick={() => setTabValue('Posted Projects')}
          className={`lg:text-xl text-sm outline-none font-medium text-[#1D1D1D] hover:text-lightHover relative transition ease-in-out duration-300`}
        >
          <span
            className={`!w-max ${
              tabValue === 'Posted Projects' &&
              '!text-lightHover before:border-b-2 before:w-full before:absolute before:top-8 before:border-lightHover'
            }`}
          >
            Posted Projects
          </span>
        </button>
        <button
          type="button"
          onClick={() => setTabValue('Running Projects')}
          className={`lg:text-xl text-sm outline-none font-medium text-[#1D1D1D] hover:text-lightHover relative transition ease-in-out duration-300`}
        >
          <span
            className={`${
              tabValue === 'Running Projects' &&
              '!text-lightHover before:border-b-2 before:w-full before:absolute before:top-8 before:border-lightHover'
            }`}
          >
            Running Projects
          </span>
        </button>
        <button
          type="button"
          onClick={() => setTabValue('Archived Projects')}
          className={`lg:text-xl text-sm outline-none font-medium text-[#1D1D1D] hover:text-lightHover relative transition ease-in-out duration-300`}
        >
          <span
            className={`!w-max ${
              tabValue === 'Archived Projects' &&
              '!text-lightHover before:border-b-2 before:w-full before:absolute before:top-8 before:border-lightHover'
            }`}
          >
            Archived Projects
          </span>
        </button>
      </div>
      <div className="flex justify-end items-center gap-5">
        <Button
          onClick={() => router.push('/dashboard/admin-marketplace/post-new-project')}
          rounded="full"
          className="mb-4 inline text-base w-full font-semibold md:w-auto"
        >
          Post New Project
        </Button>
      </div>
    </div>
  );
};

export default JobPostHeader;
