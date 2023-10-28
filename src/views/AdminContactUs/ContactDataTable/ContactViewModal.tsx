import React from 'react';
import Modal from '@components/Modal';
import Input from '@views/Setting/Input';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    data: any;
}

const ContactViewModal = ({ open, setOpen, data }: Props) => {

    return (
        <Modal open={open} setOpen={setOpen} title={'Contact Us'}>
            <div className="w-[330px] md:w-[500px] xl:w-[850px]">
                <form>
                    <div className="w-full mb-[20px]">
                        <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500]">
                            Name
                        </h2>
                        <Input value={data?.name} readOnly className="text-lg" />
                    </div>

                    <div className="w-full flex items-center flex-wrap md:flex-nowrap gap-x-[18px] xl:gap-x-[20px]">
                        <div className="w-full md:w-1/2 mb-[20px]">
                            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500]">
                                Email
                            </h2>
                            <Input value={data?.email} readOnly className="text-lg" />
                        </div>

                        <div className="w-full md:w-1/2 mb-[20px]">
                            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500]">
                                Mobile
                            </h2>
                            <Input value={data?.mobile} readOnly className="text-lg" />
                        </div>
                    </div>

                    <div className="flex flex-col w-full mb-[15px]">
                        <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                            Message
                        </h2>
                        <textarea
                            rows={7}
                            value={data?.message}
                            readOnly
                            className="text-lg focus:outline-none rounded-[8px] border border-[#E0E0E0] w-full py-5 px-5"
                        ></textarea>
                    </div>

                </form>
            </div>
        </Modal>
    );
};

export default ContactViewModal;
