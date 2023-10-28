import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import TableLoader from '@components/Loaders/TableLoader';
import Modal from '@components/Modal';
import { TimeoffAPISendDataType } from '@config/types';
import useUser from '@hooks/useUser';
import RequestCard from '@views/Users/Partials/RequestCard';
import React from 'react';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    selectedUserId: any;
    token: string;
}

const RequestModal = ({ open, setOpen, token, selectedUserId }: Props) => {

    // hook
    const { user, userLoading, userFetch } = useUser(token, selectedUserId);

    // filter data which is in progress
    const filteredDatas = user?.user?.timeOff?.filter((item: TimeoffAPISendDataType) => item.status === 'progress');

    // if token, user and profile data empty then loading will go on
    if (!token) return <FullPageLoader />

    return (
        <Modal open={open} setOpen={setOpen} title={'Requests'}>
            <div className='lg:w-[908px] sm:w-[600px] w-full h-full'>

                {/* 
                    1. if api fetching, loader will show
                    2. If timeoff data greater than 0 then all data will show
                    3. If timeoff data equal 0 then Available request: 0 will show
                */}

                {/* {user.user_get_loading ? <TableLoader /> : filteredDatas?.length > 0 ? */}
                {userLoading ? <TableLoader /> : filteredDatas?.length === 0 ? <div className="flex justify-center mt-5"><p className='text-lightHover'>Available request: 0</p></div> : filteredDatas?.map((item: TimeoffAPISendDataType) => <RequestCard
                    key={item._id}
                    setOpen={setOpen}
                    item={item}
                    userId={selectedUserId}
                    userFetch={userFetch}
                />)}

            </div>
        </Modal>
    );
};

export default RequestModal;