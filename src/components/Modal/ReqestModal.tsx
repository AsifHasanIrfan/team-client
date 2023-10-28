import { ModalProps } from '@config/types';
import { IoMdClose } from 'react-icons/io';
import React from 'react';
import Button from '@components/Button';

const RequestModal = ({ children, open, setOpen, headerDesign, title, footer, headerFixed, handleRequest, loading, isChecked, setIsChecked }: any): JSX.Element => {

    // return
    if (!open) return <></>;

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-[1000000] flex items-center justify-center">

            <div
                className={`absolute top-0 bottom-0 left-0 right-0 bg-[#00000047]`}
                onClick={() => setOpen(false)}
            >
            </div>

            <div className='rounded-[8px] max-h-[95vh] overflow-y-auto no-scrollbar z-10 relative w-max'>


                <div className={`flex justify-between items-center bg-[#263238] px-2 ${headerFixed && 'fixed top-[2.5%] z-10 w-[380px] md:w-[760px] xl:w-[860px] overflow-hidden'}`}>

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

                <div className={`bg-white relative py-[40px] md:max-h-[85vh] max-h-[75vh]`}>
                    <div className='mt-5 md:max-h-[77vh] max-h-[65vh] overflow-y-scroll black__scrolbar'>{children}</div>
                </div>

                <div className=" bg-slate-500 py-5 w-[380px] md:w-[760px] xl:w-[860px] rounded-t-[5px] text-white px-[15px] xl:px-[30px] ">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div
                            className="custom-checkbox w-max mb-[15px] md:mb-0"
                            role="button"
                        >
                            <label
                                htmlFor="terms"
                                className="login-checkbox block relative top-0 pl-8 cursor-pointer md:text-base text-[16px]"
                            >
                                I accept all the policies
                                <input
                                    type="checkbox"
                                    id="terms"
                                    defaultChecked={isChecked}
                                    onChange={() => setIsChecked(!isChecked)}
                                    className="absolute opacity-[0] cursor-pointer h-0 w-0"
                                />
                                <span className="checkmark absolute top-0 left-0 h-6 w-6 bg-[#FFF] border rounded-[6px] border-slate-500 after:content-[''] after:absolute after:hidden after:left-[8px] after:top-[4px] after:w-[6px] after:h-[10px] after:border-[#FFF] after:border-[0_2.5px_2.5px_0]"></span>
                            </label>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 w-full md:w-max">
                            <Button
                                onClick={() => setOpen(false)}
                                className="!px-8 !py-3 bg-[#2d3436] hover:bg-[#636e72] !shadow-none"
                            >
                                I do not agree
                            </Button>
                            <Button
                                onClick={handleRequest}
                                className={`!px-[60px] !py-3`}
                                disabled={loading}
                                loading={loading}
                                loadingText="Requesting"
                            >
                                I agree
                            </Button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default RequestModal;
