import React from 'react';
import fileDownload from "js-file-download";
import axios from "axios";

import Modal from '@components/Modal';
import dayjs from 'dayjs';
import { VscCalendar } from 'react-icons/vsc';
import { ImAttachment } from 'react-icons/im';

type EditSalaryModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: any;
};

const DrawbackViewModal: React.FC<EditSalaryModalProps> = ({
  open,
  setOpen,
  data,
}) => {

  const handleDownload = (url: any, filename: any) => {
    axios
      .get(url, {
        responseType: "blob"
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };


  return (
    <span>
      <Modal setOpen={setOpen} open={open} title={'Drawback Details'}>
        <div className="w-[330px] md:w-[500px] xl:w-[850px] h-auto overflow-hidden !overflow-y-auto scrolbar">
          <form className="font-primary space-y-[18px]">
            <div className="flex gap-x-[18px] xl:gap-x-[20px]">
              <div className="mb-[15px] sm:mb-[20px] w-full">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  Date
                </h2>

                <div className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative ">
                  <p className="ml-2">
                    {dayjs(data?.createdAt).format('DD-MM-YY')}
                  </p>

                  <VscCalendar className="ml-5" />
                </div>
              </div>
              <div className="mb-[15px] sm:mb-[20px] w-full">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  Type
                </h2>

                <div className="w-full p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative ">
                  <p className="ml-2">{data?.title}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-x-[18px] xl:gap-x-[20px]">
              <div className="mb-[15px] sm:mb-[20px] w-full">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  Reason
                </h2>

                <div className="w-full h-auto p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center justify-between relative ">
                  <p className="ml-2">{data?.reason}</p>
                </div>
              </div>
            </div>
            {data?.attachments.length > 0 && (
              <div className="mb-[20px] ">
                <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[10px]">
                  {' '}
                  Attachment{' '}
                </h2>

                {data?.attachments?.map(({ name, url }: any, i: number) => (
                  <div
                    key={i}
                    className="text-[16px] leading-[22px] text-[#0075FF] cursor-pointer gap-[5px] flex items-center w-max mb-[8px]"
                    onClick={() => handleDownload(url, name)}
                  >
                    <ImAttachment fontSize={18} />
                    <p> {name} </p>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      </Modal>
    </span>
  );
};

export default DrawbackViewModal;
