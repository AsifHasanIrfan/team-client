import {
  dashboardSidebarLinks,
  outOfdashboardSideBarLinks,
} from '@config/constants';
import { DashboardHeaderProps } from '@config/types';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import DashboardHeaderLeft from '@components/DashboardHeader/components/DashboardHeaderLeft';
import DashboardHeaderRight from '@components/DashboardHeader/components/DashboardHeaderRight';

const DashboardHeader = ({ setIsOpenMobileNav }: DashboardHeaderProps) => {
  const router = useRouter();

  const pageTitle = useMemo(
    () =>
      dashboardSidebarLinks.find((link) => link.url === router.pathname)
        ?.pageTitle ||
      outOfdashboardSideBarLinks.find((link) => link.url === router.pathname)
        ?.pageTitle,
    [router]
  );

  return (
    // <header className="px-5 md:px-[30px] 3xl:px-10 py-4 md:pt-[25px] md:pb-4 flex justify-between items-center max-w-[calc(360px+40px)] md:max-w-full md:mx-auto 3xl:max-w-[calc(1920px+40px)] mx-auto">
    <header className="px-5 md:px-[30px] 3xl:px-10 py-4 md:pt-[25px] md:pb-4 flex justify-between items-center max-w-[calc(360px+300px)] md:max-w-full md:mx-auto mx-auto">
      {/* title and mobile menu btn */}
      <DashboardHeaderLeft
        pageTitle={pageTitle}
        setIsOpenMobileNav={setIsOpenMobileNav}
      />

      {/* setting, notification, question, avatar */}
      <DashboardHeaderRight />
    </header>
  );
};

export default DashboardHeader;
