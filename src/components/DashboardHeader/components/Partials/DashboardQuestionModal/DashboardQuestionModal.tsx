import Modal from '@components/Modal';
import { dashboardQuestionProp } from '@config/types';
import Link from 'next/link';
import React from 'react';
import { AiOutlinePlayCircle, AiOutlineWhatsApp } from 'react-icons/ai';
import { GoMail } from 'react-icons/go';
const IconStyle = 'w-[30px] h-[30px] text-primary group-hover:text-[#FFF]';

type buttonProps = {
  text: string;
  Icon?: any;
  onClick?: any;
  className?: string;
};

const HelpButton = ({ text, Icon, onClick, className }: buttonProps) => {
  return (
    <span
      className={`flex items-center lg:gap-[15px] gap-[10px] lg:px-[60px] md:px-[50px] px-[26px] py-[15px]  border border-primary rounded-[10px] group hover:bg-primary transition ease-in-out duration-300 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {Icon}
      <p className="font-medium text-[18px] text-primary group-hover:text-[#FFF]">
        {text}
      </p>
    </span>
  );
};

const DashboardQuestionModal: React.FC<dashboardQuestionProp> = ({
  open,
  setOpen,
  handleVideoModal,
  videoRef,
  handlePrivacyModal,
}: dashboardQuestionProp) => {
  return (
    <>
      <Modal open={open} setOpen={setOpen} title={'Need Help'}>
        <div
          className={`md:min-w-[650px]
                                 bg-white z-50 rounded-[10px] md:p-[15px] lg:px-[15x] md:pt-0 p-0`}
          aria-labelledby="questionBtn"
        >
          <div className="drop-shadow-2xl w-full">
            <h6 className="lg:text-[24px] text-[18px] font-medium text-center mb-[17px]">
              Need Help?
            </h6>
            <p className="lg:text-base text-sm text-center">
              Reaching out to someone is not always easy. But it is at Digital
              Gregg. <br /> If admin is not available in meet, message in
              Whatsapp or Email to talk.
            </p>

            <div className="flex items-center sm:flex-row flex-col w-full justify-center lg:gap-[35px] gap-[25px] mt-[30px]">
              <Link
                href="https://api.whatsapp.com/send?phone=8801851590694"
                passHref
              >
                <a
                  target="_blank"
                  className="md:w-auto w-full md:justify-start justify-center"
                >
                  <HelpButton
                    text="WhatsApp"
                    Icon={<AiOutlineWhatsApp className={IconStyle} />}
                    className="md:justify-start justify-center"
                  />
                </a>
              </Link>

              <Link href="mailto:gregg@digitalgregg.com" passHref>
                <HelpButton
                  text="Email"
                  Icon={<GoMail className={IconStyle} />}
                  className="md:w-auto w-full md:justify-start justify-center"
                />
              </Link>
            </div>
            <div
              className="flex items-center flex-col justify-center gap-[20px] mt-[20px] lg:px-[60px] md:px-[95px] "
              ref={videoRef}
            >
              <HelpButton
                text="Play Tutorial - English"
                Icon={<AiOutlinePlayCircle className={IconStyle} />}
                onClick={() => handleVideoModal('English')}
                className="w-full justify-center"
              />
              <HelpButton
                text="Play Tutorial - Bangla"
                Icon={<AiOutlinePlayCircle className={IconStyle} />}
                onClick={() => handleVideoModal('Bangla')}
                className="w-full justify-center"
              />
              <HelpButton
                text="Privacy & Policy"
                onClick={() => handlePrivacyModal()}
                className="w-full justify-center"
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DashboardQuestionModal;
