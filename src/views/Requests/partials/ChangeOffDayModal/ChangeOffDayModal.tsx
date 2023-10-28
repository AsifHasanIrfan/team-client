import Button from '@components/Button'
import Modal from '@components/Modal'
import { customStyle } from '@hooks/helpers';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import { createNotification } from '@redux/actions/notification';
import Input from '@views/Setting/Input';
import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import Select from 'react-select';

type Props = {
    open: boolean;
    setOpen: any;
    data: any;
    token: any;
    userFetch: any;
    requestFetch: any;
}

const options = [
    { value: '', label: 'Select' },
    { value: 'approved', label: 'Approved' },
    { value: 'decline', label: 'Declined' },
]

const ChangeOffDayModal = ({ open, setOpen, data, token, userFetch, requestFetch }: Props) => {

    // global states
    const dispatch = useAppDispatch();
    const { socket } = useAppSelector(state => state);

    // get selected option
    const [selectedOption, setSelectedOptions] = useState(options[0]);
    const [loading, setLoading] = useState(false);

    // console.log(data?.user?._id);

    const handleChangeOffDay = (e: any) => {
        e.preventDefault();

        setLoading(true);
        axios.patch(`${process.env.serverUrl}change-offday/${data?.user?._id}`, {
            status: selectedOption?.value,
            reqId: data?._id,
            weeklyOffday: data?.day
        }, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setLoading(false);
                if (response.data.success === false) {
                    return toast.error(response.data.message);
                }
                if (response.data.success === true) {
                    userFetch();
                    requestFetch();
                    setOpen(false);
                    setSelectedOptions(options[0]);
                    toast.success(response.data.message);


                    const notifyData = {
                        recipients: [data?.user?._id],
                        url: '/dashboard/timeoff',
                        // @ts-ignore
                        content: `Your weekly offday is ${data?.day} ${selectedOption.value}`
                    }

                    dispatch(createNotification(notifyData, token, socket));
                }
            });
    }

    return (
        <Modal open={open} setOpen={setOpen} title={'Timeoff Request'}>
            <div className="w-[330px] md:w-[500px] xl:w-[850px]">
                <form onSubmit={handleChangeOffDay}>


                    <div className="w-full flex items-center flex-wrap md:flex-nowrap gap-x-[18px] xl:gap-x-[20px]">
                        <div className="w-full md:w-1/2 mb-[20px]">
                            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500]">
                                Username
                            </h2>

                            <Input value={data?.user?.username} readOnly className="text-lg" />
                        </div>

                        <div className="w-full md:w-1/2 mb-[20px]">
                            <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500]">
                                Requested Day
                            </h2>

                            <Input value={data?.day} readOnly className="text-lg" />
                        </div>
                    </div>



                    <div className="flex flex-col w-full">
                        <h2 className="text-[14px] xl:text-[20px] leading-[28px] font-[500] mb-[15px]">
                            Status
                        </h2>
                        <div className="p-[5px] xl:py-[9px] xl:px-[10px] border-[1px] text-[16px] leading-[22px] rounded-[8px] gap-[10px] border-[#E0E0E0] ">

                            <Select
                                defaultValue={options.find((item: any) => item.value === data?.status)}
                                options={options}
                                styles={customStyle}
                                isSearchable={false}
                                id="selectbox"
                                instanceId="selectbox"
                                onChange={(option: any) => {
                                    setSelectedOptions(option)
                                }}
                            />

                        </div>
                    </div>

                    <div className="flex justify-end mt-[40px]">

                        <div className="md:w-[155px] w-full h-[50px] shrink-0 self-end">
                            <Button
                                rounded="md"
                                className="w-full h-full !text-sm !px-[15px]"
                                disabled={selectedOption.value === ''}
                                loading={loading}
                                loadingText={'Updating'}
                            >
                                Update
                            </Button>
                        </div>
                    </div>

                </form>
            </div>
        </Modal>
    )
}

export default ChangeOffDayModal