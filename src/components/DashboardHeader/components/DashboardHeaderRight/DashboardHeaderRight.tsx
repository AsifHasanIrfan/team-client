import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IoSettingsOutline } from 'react-icons/io5';
import DashboardNotification from '../../../DashboardNotification/DashboardNotification';
import DashboardSetting from '../Partials/DasboardSetting/DashboardSetting';
import DashboardQuestion from '../Partials/DashboardQuestion/DashboardQuestion';
import DashboardQuestionModal from '../Partials/DashboardQuestionModal/DashboardQuestionModal';

import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { signout } from '@redux/actions/auth';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { BiLogOut } from 'react-icons/bi';
import PrivacyModal from '../PrivacyModal/PrivacyModal';
import usePolicy from '@hooks/usePolicy';

const iconBtnStyle =
  'w-10 h-10 md:w-[60px] md:h-[60px] flex justify-center items-center outline-none border-none hover:bg-primary/5 rounded-md relative';

const DashboardHeaderRight = () => {
  // global states
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((state) => state);
  // const { user } = auth;

  // hooks
  const { policy, policyLoading } = usePolicy(auth?.token);

  // states
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [showMenuDropdown, setMenuDropdown] = useState<boolean>(false);
  const [openVideoModal, setOpenVideoModal] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [videoLink, setVideoLink] = useState('');

  // dashboard question modal state
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOpenMenus = (e: MouseEvent) => {
      if (
        dropdownMenuRef.current &&
        showMenuDropdown &&
        !dropdownMenuRef.current.contains(e.target as Node)
      ) {
        setMenuDropdown(false);
      }
    };
    document.addEventListener('mousedown', closeOpenMenus);
  }, [showMenuDropdown]);

  const handleDropdownToggle = () => {
    setMenuDropdown(!showMenuDropdown);
  };

  const videoRef = useDetectClickOutside({
    onTriggered: () => setOpenVideoModal(false),
  });

  const handleVideoModal = (lang: string) => {
    setOpenVideoModal(true);
    if (lang === 'Bangla') {
      setVideoLink(
        'https://player.vimeo.com/video/777692304?h=aee925f4ae&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;loop=1'
      );
    } else {
      setVideoLink(
        'https://player.vimeo.com/video/777692588?h=aee925f4ae&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;loop=1'
      );
    }
  };

  const handlePrivacyModal = () => {
    setOpen(!open);
    setPrivacyModalOpen(!privacyModalOpen);
  }

  return (
    <>
      <div className="flex items-center gap-5 lg:gap-10">
        <div className="flex gap-2 lg:gap-[25px]">
          {/*===========Notification=================  */}
          <DashboardNotification iconBtnStyle={iconBtnStyle} />

          {/*===========Setting=================  */}
          <DashboardSetting
            iconBtnStyle={iconBtnStyle}
            displayProperty={true}
          />

          {/*===========Question=================  */}
          <DashboardQuestion
            open={open}
            setOpen={setOpen}
            iconBtnStyle={iconBtnStyle}
            displayProperty={true}
          />
        </div>

        {/* Profile Avatar --Start-- */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          ref={dropdownMenuRef}
        >
          <div
            className="w-11 h-11 md:w-[60px] md:h-[60px] rounded-full overflow-hidden bg-slate-200 relative"
            onClick={handleDropdownToggle}
          >
            <Image
              src={auth?.user?.avatar || '/images/defaultDg.png'}
              alt="user avatar"
              layout="fill"
              className="w-full !h-[130%]"
            />
          </div>

          <div
            className="items-center hidden font-medium cursor-pointer text-left text-black md:block hover:text-red"
            onClick={handleDropdownToggle}
          >
            {auth?.user?.firstName?.split(' ')[0] !== undefined
              ? auth?.user?.firstName.split(' ')[0]
              : auth?.user?.firstName}
          </div>

          {/* mobile menu */}
          <div className="relative block dropdown">
            <IoIosArrowDown
              className="hover:text-red"
              onClick={handleDropdownToggle}
            />

            <div
              className={`dropdown-menu !z-50 min-w-[100px] absolute drop-shadow-lg
                            right-[0px] top-[40px] p-[10px_15px]
                            ${!showMenuDropdown && 'hidden'
                } bg-white z-[5] rounded-[8px] py-[15px]`}
              aria-labelledby="notificationBtn"
            >
              <div className="">
                {/*===========Setting=================  */}
                <Link href="/dashboard/settings">
                  <div className="grid grid-cols-[28%_72%] items-center justify-center mb-3 group">
                    <IoSettingsOutline className="group-hover:text-[#C10206] text-[16px]" />
                    <p className="group-hover:text-[#C10206] text-[16px]">
                      Settings
                    </p>
                  </div>
                </Link>

                {/*===========Question=================  */}
                <div
                  className="grid grid-cols-[28%_72%] items-center justify-center group"
                  onClick={() => setOpen(!open)}
                  role="button"
                >
                  <FaQuestion className="group-hover:text-[#C10206] text-[16px]" />
                  <p className="group-hover:text-[#C10206] text-[16px]">Help</p>
                </div>

                {/*===========Logout=================  */}
                <div
                  className="grid grid-cols-[28%_72%] items-center justify-center mt-3 group"
                  onClick={() => dispatch(signout())}
                  role="button"
                >
                  <BiLogOut size={16} className="group-hover:text-[#C10206]" />
                  <p className="group-hover:text-[#C10206] text-[16px]">
                    Logout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Profile Avatar --End-- */}
      </div>

      {/* modal dashboard question */}
      <DashboardQuestionModal
        open={open}
        setOpen={setOpen}
        handleVideoModal={handleVideoModal}
        videoRef={videoRef}
        handlePrivacyModal={handlePrivacyModal}
      />

      {/* privacy & policy modal */}
      <PrivacyModal
        open={privacyModalOpen}
        setOpen={setPrivacyModalOpen}
        loading={policyLoading}
        data={policy?.data}
      />

      {/* Video Modal */}
      {openVideoModal && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-[1000000] flex items-center justify-center">
          <div className="relative md:w-[80%] w-full md:h-[80%] h-full flex items-center justify-center">
            {/* <div className="absolute top-[1.5%] right-[7.5%] z-[10000000]">
              <VscChromeClose
                className="text-[20px] text-[#d2d2d2] cursor-pointer hover:text-lightHover transition-all duration-300"
                onClick={() => setOpenVideoModal(false)}
              />
            </div> */}
            <iframe
              src={videoLink}
              width="100%"
              height="100%"
              title="Iframe Example"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHeaderRight;
