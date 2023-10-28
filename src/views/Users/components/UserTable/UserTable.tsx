import { FiEdit } from 'react-icons/fi';
import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import TableLoader from '@components/Loaders/TableLoader';
import { GetTeamAPIRequestDataTypeProp, TimeoffAPISendDataType } from '@config/types';
import { useAppSelector } from '@hooks/useRedux';
import { userSearchValueAtom } from '@state/index';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import RequestModal from '../RequestModal';
import RequestButton from './RequestButton';
import useUsers from '@hooks/useUsers';

const UserTable: React.FC = () => {

    // next router
    const router = useRouter();

    // global variable from redux
    const { auth } = useAppSelector((state) => state);

    // hooks
    const { users, usersLoading } = useUsers(auth.token);

    // states
    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string>('');
    const [searchedActiveUsers, setSearchedActiveUsers] = useState([]);
    const [searchedArchivedUsers, setSearchedArchivedUsers] = useState([]);

    // atom states
    const [searchValue, setSearchValue] = useAtom(userSearchValueAtom);

    // filter active/archive data and search
    useEffect(() => {
        const activeUsers = users?.users?.filter((item: GetTeamAPIRequestDataTypeProp) => item.isArchived !== true);
        const archivedUsers = users?.users?.filter((item: GetTeamAPIRequestDataTypeProp) => item.isArchived === true);

        if (searchValue) {
            setSearchedActiveUsers(activeUsers?.filter((el: any) => (el.username)?.match(new RegExp(searchValue, "i"))));
            setSearchedArchivedUsers(archivedUsers?.filter((el: any) => (el.username)?.match(new RegExp(searchValue, "i"))));
        } else {
            setSearchedActiveUsers(activeUsers);
            setSearchedArchivedUsers(archivedUsers);
        }
    }, [searchValue, users?.users, setSelectedUserId]);

    // columns
    const columns: TableColumn<any>[] = [
        {
            name: 'Username',
            selector: (row) => row?.username,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row) => row?.email,
            width: '300px'
        },
        {
            name: 'Role',
            selector: (row) => row?.designation,
        },
        {
            name: 'Join Date',
            selector: (row) => row?.createdAt.slice(0, 10),
            sortable: true,
        },
        {
            name: 'Request',
            selector: (row) => row?.timeOff?.filter((e: TimeoffAPISendDataType) => e.status === 'progress').length,
            cell: (row) => <RequestButton
                datas={row.timeOff}
                open={open}
                setOpen={setOpen}
                setSelectedUserId={setSelectedUserId}
                id={row._id}
            />,
            sortable: true,
            center: true,
            button: true,
        },
        {
            name: 'Action',
            selector: (row) => <Link href={`/dashboard/user/${row?._id}`} passHref>
                <button type='button' className='group'>
                    <span className='flex items-center gap-[9px] text-[16px]'>
                        <FiEdit className='group-hover:text-primary text-[16px] transition ease-in-out duration-300' />
                        <span className='text-[16px] font-medium group-hover:text-primary transition ease-in-out duration-300 relative top-[1px]'>Edit</span>
                    </span>
                </button>
            </Link>
        },
    ];

    // if token empty then loading will go on 
    if (!auth.token) return <FullPageLoader />

    return (
        <div className='users__management'>
            {/*======================= table =========================================*/}
            <DataTable
                columns={columns}
                data={router.route === '/dashboard/users' ? searchedActiveUsers : searchedArchivedUsers}
                progressPending={usersLoading}
                progressComponent={<TableLoader />}
                persistTableHead={true}
            />
            {/*======================= table =========================================*/}

            {/* request modal */}
            <RequestModal
                token={auth.token}
                selectedUserId={selectedUserId}
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
};

export default UserTable;