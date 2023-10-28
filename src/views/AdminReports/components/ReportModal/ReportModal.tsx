import ProfileInput from '@components/Input/ProfileInput';
import Modal from '@components/Modal';
import axios from 'axios';
import fileDownload from 'js-file-download';
import React from 'react'
import { ImAttachment } from 'react-icons/im';

type Props = {
    data: any;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const ReportModal = ({ open, setOpen, data }: Props) => {

    const handleDownload = (url: any, filename: any) => {
        axios.get(url, {
            responseType: "blob"
        })
            .then((res) => {
                fileDownload(res.data, filename);
            });
    };

    return (
        <Modal open={open} setOpen={setOpen} title={`${data?.user?.firstName + ' ' + data?.user?.lastName}'s Report`}>
            <div className="w-[330px] md:w-[500px] xl:w-[850px]">

                <ProfileInput
                    label={'Subject'}
                    value={data?.subject}
                    isReadonly={true}
                />

                <div className='grid lg:grid-cols-2 grid-cols-1 gap-5'>
                    <ProfileInput
                        label={'Reported By'}
                        value={data?.user?.firstName + ' ' + data?.user?.lastName}
                        isReadonly={true}
                    />
                    <ProfileInput
                        label={'Reported To'}
                        value={data?.member?.firstName + ' ' + data?.member?.lastName}
                        isReadonly={true}
                    />
                </div>

                <div className={`w-full mb-[15px] mt-[20px] lg:mt-0 lg:col-span-2 col-span-1`}>
                    <h2 className="font-medium text-base leading-6 mb-2.5">
                        Description
                    </h2>

                    <div className={`focus:outline-none rounded-[8px]  w-full`}>
                        <textarea
                            className="form-control block w-full px-5 py-[18px] text-base font-normal bg-white bg-clip-padding border resize-none border-solid border-gray-300 rounded m-0 focus:outline-none"
                            id="description"
                            rows={6}
                            value={data?.description}
                            readOnly
                        ></textarea>
                    </div>
                </div>

                {data?.attachments?.length > 0 && (
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




            </div>
        </Modal>
    )
}

export default ReportModal