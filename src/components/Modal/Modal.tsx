import { ModalProps } from '@config/types';
import { IoMdClose } from 'react-icons/io';
import React from 'react';

const Modal = ({ children, open, setOpen, headerDesign, title, footer, headerFixed }: ModalProps): JSX.Element => {

  // return
  if (!open) return <></>;

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[1000000] flex items-center justify-center">

      <div
        className={`absolute top-0 bottom-0 left-0 right-0 bg-[#00000047]`}
        onClick={() => setOpen(false)}
      >
      </div>

      <div className='rounded-[8px] max-h-[95vh] overflow-y-auto no-scrollbar z-10 relative'>


        <div className={`flex justify-between items-center bg-[#263238] px-2 ${headerFixed && 'fixed top-[2.5%] z-10 w-[370px] md:w-[750px] xl:w-[850px] overflow-hidden'}`}>

          <div className="py-[13px] pl-[20px] w-full h-full ">
            <p className="text-[16px] !text-white font-[500] leading-[22px] cursor-default">
              {title ? title : 'Modal Title'}
            </p>
          </div>

          <IoMdClose
            className={`z-[9999] hover:text-primary text-white pr-4 w-[40px] text-[23px] cursor-pointer transition ease-in-out duration-300`}
            onClick={() => setOpen(false)}
          />
        </div>

        <div className={`bg-white relative py-[40px] ${(!headerDesign && !footer) && 'px-[15px] xl:px-[30px]'} `}>
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;
