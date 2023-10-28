import SiteLogo from '@components/SiteLogo';
import SiteLogoSmall from '@components/SiteLogoSmall';
import { cx, dashboardSidebarLinks } from '@config/constants';
import { useAppSelector } from '@hooks/useRedux';
import { useAuth } from '@state';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoMdClose } from 'react-icons/io';

const DashboardSidebar = ({
  isOpenMobileNav,
  setIsOpenMobileNav,
}: {
  isOpenMobileNav: boolean;
  setIsOpenMobileNav: (prev: any) => void;
}) => {

  // global variable from redux
  const router = useRouter();
  const { isAdmin } = useAuth();
  const { auth } = useAppSelector((state) => state);

  return (
    <div
      className={cx(
        'w-full bg-[#263238] md:opacity-100 md:pointer-events-auto duration-150 md:relative flex flex-col fixed top-0 left-0 h-screen __dashboardSideBarScrollBar z-[99999]',
        isOpenMobileNav
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      )}
    >
      <button
        className="absolute p-2 text-white rounded top-5 right-5 md:hidden"
        onClick={() => setIsOpenMobileNav(false)}
      >
        <IoMdClose size={30} className="hover:!text-primary" />
      </button>

      <div className="pl-10 md:pl-0 lg:pl-5 xl:pl-10 pt-[30px] lg:pt-[38px] flex md:justify-center lg:justify-start">
        <div className="max-w-[70px]">
          <div className="block md:hidden lg:block">
            <SiteLogo url="/dashboard" />
          </div>
          <div className="hidden md:block lg:hidden">
            <SiteLogoSmall url="/dashboard" />
          </div>
        </div>
      </div>

      {/* Sidebar Links --Start-- */}
      <ul className="mt-[55px] space-y-1 grow overflow-auto h-full __dashboardSideBarScrollBar">
        {dashboardSidebarLinks.map(({ icon, url, text, forAdmin }, i) => {
          const isActive = router.pathname === url;
          return (
            <li key={i} className={cx(((!isAdmin && forAdmin) || (url === '/dashboard/users-salary' && auth?.user?.email !== 'asifhasanirfan@gmail.com')) && 'hidden')}>
              <Link href={url}>
                <a
                  onClick={() => setIsOpenMobileNav(false)}
                  style={{
                    background:
                      isActive ||
                        (router.pathname === '/dashboard/users/archived' &&
                          text === 'Users') ||
                        (router.pathname === '/dashboard/user/[id]' &&
                          text === 'Users') ||
                        (router.pathname === '/dashboard/marketplace/[id]' &&
                          text === 'Marketplace') ||
                        (router.pathname ===
                          '/dashboard/admin-marketplace/post-new-project' &&
                          text === 'Admin Marketplace') ||
                        (router.pathname ===
                          '/dashboard/marketplace/my-application' &&
                          text === 'Marketplace') ||
                        (router.pathname ===
                          '/dashboard/marketplace/apply/[projectId]' &&
                          text === 'Marketplace') ||
                        (router.pathname ===
                          '/dashboard/marketplace/details/[id]' &&
                          text === 'Marketplace') ||
                        (router.pathname ===
                          '/dashboard/marketplace/update/[projectId]' &&
                          text === 'Marketplace') ||
                        (router.pathname ===
                          '/dashboard/admin-marketplace/view-project/[projectId]' &&
                          text === 'Admin Marketplace')
                        ? 'linear-gradient(90deg, #C10206 0%, rgba(255, 8, 57, 0) 100%)'
                        : undefined,
                  }}
                  className={cx(
                    !isActive && 'hover:sidebar_links_hover',
                    'flex items-center md:justify-center lg:justify-start gap-2.5 md:gap-[15px] pl-10 md:pl-0 lg:pl-8 xl:pl-10 py-[17px] text-white md:text-xl duration-100 relative'
                  )}
                >
                  {(isActive ||
                    (router.pathname === '/dashboard/users/archived' &&
                      text === 'Users') ||
                    (router.pathname === '/dashboard/user/[id]' &&
                      text === 'Users') ||
                    (router.pathname === '/dashboard/marketplace/[id]' &&
                      text === 'Apply Job') ||
                    (router.pathname ===
                      '/dashboard/admin-marketplace/post-new-project' &&
                      text === 'Admin Marketplace') ||
                    (router.pathname ===
                      '/dashboard/marketplace/my-application' &&
                      text === 'Marketplace') ||
                    (router.pathname ===
                      '/dashboard/marketplace/apply/[projectId]' &&
                      text === 'Marketplace') ||
                    (router.pathname ===
                      '/dashboard/marketplace/details/[id]' &&
                      text === 'Marketplace') ||
                    (router.pathname ===
                      '/dashboard/marketplace/update/[projectId]' &&
                      text === 'Marketplace') ||
                    (router.pathname ===
                      '/dashboard/admin-marketplace/view-project/[projectId]' &&
                      text === 'Admin Marketplace')) && (
                      <div className="absolute top-0 left-0 w-2 h-full bg-[#FF00324D] rounded-r-lg"></div>
                    )}
                  <span className="shrink-0 scale-[0.8] origin-left md:scale-100 inline-block">
                    {icon}
                  </span>
                  <span className="inline-block translate-y-px md:hidden lg:inline-block truncate text-ellipsis">
                    {text}
                  </span>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Sidebar Links --End-- */}

      {/* Logout Button --Start-- */}
      <div className="mt-[36px]">
        {/* <div className="mt-[32px] md:mt-[26px] lg:mt-[50px] xl:mt-[75px] px-[25px] pb-8 md:pb-[22px] lg:pb-[30px] xl:pb-[40px] 3xl:pb-[52px] "> */}
        {/* <Button
          className="w-full px-0 lg:px-5 py-[22px] md:py-3 lg:py-[22px] text-xl gap-2"
          startIcon={<BiLogOut size={25} />}
          onClick={() => dispatch(signout())}
          loading={global.signout_loading}
        >
          <span className="inline-block md:hidden lg:inline-block">Logout</span>
        </Button> */}
      </div>
      {/* Logout Button --End-- */}
    </div>
  );
};

export default DashboardSidebar;
