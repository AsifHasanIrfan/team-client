import { dashboardHeaderLeftProp } from '@config/types';
import { FiMenu } from 'react-icons/fi';
import React from 'react';
import { useRouter } from 'next/router';


const DashboardHeaderLeft: React.FC<dashboardHeaderLeftProp> = ({ setIsOpenMobileNav, pageTitle }: dashboardHeaderLeftProp) => {

  // default
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <button
        className="md:hidden"
        onClick={() => setIsOpenMobileNav((prev: any) => !prev)}
      >
        <FiMenu size={30} />
      </button>
      <h3
        className="text-[22px] md:text-[32px] font-semibold leading-[140%] text-[#2D2B2B] line-clamp-1 cursor-default"
        title={pageTitle?.toString() ||
          router.pathname === '/dashboard/users/archived' && 'Users Management' ||
          router.pathname === '/dashboard/admin-marketplace/post-new-project' && 'Post New Project' ||
          router.pathname === '/dashboard/admin-marketplace/view-project/[projectId]' && 'Edit Project' ||
          router.pathname === '/dashboard/marketplace/my-application' && 'My Application' ||
          router.pathname === '/dashboard/marketplace/apply/[projectId]' && 'Apply Project' ||
          router.pathname === '/dashboard/marketplace/details/[id]' && 'View Project' ||
          router.pathname === '/dashboard/marketplace/update/[projectId]' && 'Update Project' ||
          'Dashboard'}
      >
        {pageTitle ||
          router.pathname === '/dashboard/users/archived' && 'Users Management' ||
          router.pathname === '/dashboard/admin-marketplace/post-new-project' && 'Post New Project' ||
          router.pathname === '/dashboard/admin-marketplace/view-project/[projectId]' && 'Edit Project' ||
          router.pathname === '/dashboard/marketplace/my-application' && 'My Application' ||
          router.pathname === '/dashboard/marketplace/apply/[projectId]' && 'Apply Project' ||
          router.pathname === '/dashboard/marketplace/details/[id]' && 'View Project' ||
          router.pathname === '/dashboard/marketplace/update/[projectId]' && 'Update Project' ||
          'Dashboard'}
        {/* {pageTitle || router.pathname === '/dashboard/users/archived'
          ? 'Users Management'
          : '/dashboard/admin-marketplace/post-new-project' ? 'Post New Project' : 'Dashboard'} */}
      </h3>
    </div>
  );
};

// ||
//           router.pathname === '/dashboard/users/archived'
//           ? 'Users Management'
//           : '/dashboard/admin-marketplace/post-new-project' ? 'Post New Project' : 'Dashboard'

export default DashboardHeaderLeft;