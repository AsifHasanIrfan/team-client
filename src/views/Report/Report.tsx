import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import useMembers from '@hooks/useMembers';
import { useAppSelector } from '@hooks/useRedux';
import useUsers from '@hooks/useUsers';
import Header from '@views/UserProfile/partials/Header';
import React, { useState } from 'react'
import ReportMain from './components/ReportMain';

type Props = {}

const Report = (props: Props) => {

    // global variable from redux
    const { auth, socket } = useAppSelector((state) => state);

    // hooks
    const { members, membersLoading } = useMembers(auth.token);

    // get users for options
    const activeUsers = members?.users?.filter((item: any) => item.role !== 'admin' && item.isArchived === false && item.username !== 'mockuser' && item._id !== auth?.user?._id).map((item: any) => {
        return { title: `${item.firstName} ${item.lastName}`, value: `${item.firstName} ${item.lastName}`, member: item._id }
    }) || []

    // loading
    if (!auth.token || membersLoading) return <FullPageLoader />

    return (
        <div className='px-8 pt-4 pb-10 rounded-[20px] bg-[#FFFFFF] tasksPage-shadow'>

            <Header>Report</Header>

            <ReportMain
                activeUsers={activeUsers}
                user={auth?.user?._id}
                token={auth?.token}
                socket={socket}
                fullName={auth?.user?.firstName + ' ' + auth?.user?.lastName}
            />
        </div>
    )
}

export default Report