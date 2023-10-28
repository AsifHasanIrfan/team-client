import AgreeModalPr from '@components/AgreeModal/AgreeModalPr';
import DashboardHeader from '@components/DashboardHeader';
import DashboardSidebar from '@components/DashboardSidebar';
import usePolicy from '@hooks/usePolicy';
import { useAppSelector } from '@hooks/useRedux';
import { useAuth } from '@state/index';
import axios from 'axios';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const DashboardLayout = ({ children }: { children?: ReactNode }) => {

  // states
  const [open, setOpen] = useState(false);
  const [isOpenMobileNav, setIsOpenMobileNav] = useState(true);
  const [privacyAccept, setPrivacyAccept] = useState(true);
  const [loading, setLoading] = useState(false);
  const [disloading, setDisLoading] = useState(false);
  const [qloading, setQLoading] = useState(false);
  const [type, setType] = useState('');

  // global states
  const { auth } = useAppSelector((state) => state);
  const { isAdmin } = useAuth();

  // hooks
  const { policy, policyLoading, policydFetch } = usePolicy(auth?.token);

  useEffect(() => {
    if (!isAdmin && policy?.data) {
      const users = policy.data.users;

      if (users.includes(auth?.user?._id)) {
        setOpen(false);
        setPrivacyAccept(true);
      } else {
        setOpen(true);
        setPrivacyAccept(false);
      }
    }
  }, [policy?.data?.users, auth?.user?._id]);

  useEffect(() => {
    if (isOpenMobileNav) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isOpenMobileNav]);

  // privacy policy agree handler
  const handleAgree = () => {

    const policyData = {
      policyId: policy.data._id,
    };

    setLoading(true);

    axios
      .patch(
        `${process.env.serverUrl}privacy-policy/agree/${auth.user._id}`,
        policyData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        if (response.data.success === false) {
          return toast.error(response.data.message);
        }
        if (response.data.success === true) {
          policydFetch();
          toast.success(response.data.message);
        }
      });
  };

  // privacy policy agree handler
  const handleDisAgree = () => {

    const policyData = {
      policyId: policy.data._id,
    };

    // loading
    type === 'dis-loading' ? setDisLoading(true) : setQLoading(true);

    axios
      .patch(
        `${process.env.serverUrl}privacy-policy/disagree/${auth.user._id}`,
        policyData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
        }
      )
      .then((response) => {
        type === 'dis-loading' ? setDisLoading(false) : setQLoading(false);
        if (response.data.success === false) {
          // return toast.error(response.data.message);
        }
        if (response.data.success === true) {
          policydFetch();
          // toast.success(response.data.message);
        }
      });
  };

  return (
    <div className="grid md:grid-cols-[110px,auto] lg:grid-cols-[220px,auto] xl:grid-cols-[260px,auto] 3xl:grid-cols-[270px,auto] min-h-screen bg-[#F7F8FA]">
      <DashboardSidebar
        isOpenMobileNav={isOpenMobileNav}
        setIsOpenMobileNav={setIsOpenMobileNav}
      />

      {/* Dashboard Content --Start-- */}
      <div className="h-screen overflow-hidden overflow-y-auto dashboard-body">
        <DashboardHeader setIsOpenMobileNav={setIsOpenMobileNav} />
        {/* <div className="max-w-[calc(360px+40px)] md:max-w-full mx-auto px-5 md:p-[30px] 3xl:p-10 3xl:max-w-[calc(1920px+40px)] pb-6 lg:pb-10"> */}
        <div className="max-w-[calc(360px+300px)] md:max-w-full mx-auto px-5 md:p-[30px] 3xl:p-10 pb-6 lg:pb-10">
          {privacyAccept && children}
        </div>
      </div>
      {open && (
        <AgreeModalPr
          open={open}
          setOpen={setOpen}
          data={policy?.data}
          handleAgree={handleAgree}
          policyLoading={policyLoading}
          loading={loading}
          disLoading={disloading}
          handleDisAgree={handleDisAgree}
          qloading={qloading}
          setType={setType}
        />
      )}
      {/* Dashboard Content --End-- */}
    </div>
  );
};

export default DashboardLayout;
