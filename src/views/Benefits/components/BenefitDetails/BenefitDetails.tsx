import Input from '@components/Input';
import Modal from '@components/Modal';
import React from 'react';

type Props = {
  setOpen: any;
  open: any;
  modalData: any;
}

const BenefitDetails = ({ setOpen, open, modalData }: Props) => {

  return (
    <>
      <Modal
        setOpen={setOpen}
        open={open}
        title={`${modalData?.title} - Benefit Details`}
      >
        <div className="w-[330px] md:w-[500px] xl:w-[850px]">
          <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
            Benefit
          </h2>
          <div className="w-full mb-5 p-[10px] xl:py-[16px] xl:px-[20px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] flex items-center bg-[#FDFDFD]">
            <input
              className="w-full outline-none text-lg"
              value={modalData?.title}
              disabled
            />
          </div>
          <div className="grid grid-cols-1 gap-x-5">
            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
              Benefit sub description
            </h2>
            <textarea
              className="text-lg focus:outline-none rounded-[8px] border border-[#E0E0E0] w-full py-5 px-5 mb-5 h-max"
              disabled
              value={modalData?.subDescription}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-5">
            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
              Benefit description
            </h2>
            <textarea
              className="text-lg focus:outline-none rounded-[8px] border border-[#E0E0E0] w-full py-5 px-5 mb-5 h-max"
              disabled
              rows={10}
              value={modalData?.description}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BenefitDetails;