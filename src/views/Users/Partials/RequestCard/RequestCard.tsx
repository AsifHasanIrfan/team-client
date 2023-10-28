import Button from '@components/Button';
import { TimeoffAPISendDataType } from '@config/types';
import { useAppDispatch, useAppSelector } from '@hooks/useRedux';
import useUsers from '@hooks/useUsers';
import { createNotification } from '@redux/actions/notification';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
    item: TimeoffAPISendDataType;
    setOpen: (open: boolean) => void;
    userFetch: any;
    userId: any;
}

const RequestCard = ({ item, setOpen, userFetch, userId }: Props) => {

    // global variable from redux
    const { auth, timeoff, socket } = useAppSelector(state => state);
    const dispatch = useAppDispatch()

    // hooks
    const { usersFetch } = useUsers(auth.token);

    // states
    const [loading, setLoading] = useState(false);
    const [getStatus, setGetStatus] = useState<string>('');
    const [getStatusTwo, setGetStatusTwo] = useState<string>('');

    // distructure
    const { _id, type, startDate, endDate, description } = item;

    const timeOffStatusUpdateFun = (values: any, timeoffId: string) => {
        setLoading(true);

        if (values.status === 'approved') {
            setGetStatus('approved');
            setGetStatusTwo('approved');
        }

        if (values.status === 'decline') {
            setGetStatus('decline');
            setGetStatusTwo('decline');
        }

        axios.patch(`${process.env.serverUrl}timeoff/${timeoffId}/update`, values, {
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${auth.token}`
            }
        })
            .then(response => {
                setLoading(false);
                if (response.data.success === false) {
                    return toast.error(response.data.message);
                }
                if (response.data.success === true) {
                    userFetch();
                    usersFetch();

                    const notifyData = {
                        recipients: [userId],
                        url: '/dashboard/timeoff',
                        // @ts-ignore
                        content: `Your ${type} request has been ${values.status}`
                    }

                    dispatch(createNotification(notifyData, auth.token, socket))

                    setOpen(false);
                    return toast.success(response.data.message);
                }
            });
    }

    // reject function
    const handleRejectTimeOff = (e: React.FormEvent<EventTarget>): void => {
        e.preventDefault();
        timeOffStatusUpdateFun({ status: 'decline' }, _id)
    }

    // accept function
    const handleAcceptRequest = (e: React.FormEvent<EventTarget>): void => {
        e.preventDefault();
        timeOffStatusUpdateFun({ status: 'approved' }, _id);
    }

    return (
        <div className="request__cards mb-[25px]">
            <div className='bg-[#F8F8F8] p-[20px] rounded-[10px]'>
                <p className='font-medium text-[20px] mb-[10px]'>{type}</p>

                {/* timeoff details */}
                <div className='grid grid-cols-[15%_85%] mb-[10px]'>
                    <p className='text-[16px] text-[#949494]'>Type</p>
                    <p className='text-[16px]'>: {type}</p>
                </div>

                <div className='grid grid-cols-[15%_85%] mb-[10px]'>
                    <p className='text-[16px] text-[#949494]'>{type === 'Late Meeting' ? 'Date' : 'Start Date'}</p>
                    <p className='text-[16px]'>: {startDate}</p>
                </div>

                {type !== 'Late Meeting' && <div className='grid grid-cols-[15%_85%] mb-[10px]'>
                    <p className='text-[16px] text-[#949494]'>End Date</p>
                    <p className='text-[16px]'>: {endDate}</p>
                </div>}

                <div className='grid grid-cols-[15%_85%] mb-[10px]'>
                    <p className='text-[16px] text-[#949494]'>Reason</p>
                    <p className={`text-[16px] ${!description && 'text-lightHover'}`}>: {description ? description : 'No reason given'}</p>
                </div>
                {/* timeoff details */}

                <div className='flex items-center gap-[20px] mt-[24px] w-full'>
                    <Button className="!p-[12px_57px] bg-white hover:bg-primary border border-primary !text-lightHover hover:!text-white shadow-none transition ease-in-out duration-500 font-medium disabled:!bg-[#DADADA]" rounded="md" disabled={timeoff.timeoff_update_loading} onClick={handleRejectTimeOff}>
                        {(loading && getStatus === 'decline') ?
                            <><span id='button__loading' className={`mr-1 ${(getStatusTwo === 'approved') && 'hidden'}`}></span>Rejecting</> : 'Reject'}

                    </Button>
                    <Button className="!p-[12px_57px] font-medium disabled:!bg-[#DADADA] " rounded="md" disabled={timeoff.timeoff_update_loading} onClick={handleAcceptRequest}>
                        {(loading && getStatus === 'approved') ?
                            <><span id='button__loading' className={`mr-1 ${getStatusTwo === 'decline' && 'hidden'}`}></span>Accepting</> : 'Accept request'}

                    </Button>
                </div>

            </div>
        </div>
    );
};

export default RequestCard;