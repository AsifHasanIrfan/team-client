import TableLoader from '@components/Loaders/TableLoader';
import useContacts from '@hooks/useContacts';
import React, { useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import { BsEye } from 'react-icons/bs';
import ContactViewModal from './ContactViewModal';

type Props = {
    token: string;
}

const ContactDataTable = ({ token }: Props) => {

    // hooks
    const { contacts, contactsLoading } = useContacts(token);

    // states
    const [modalData, setModalData] = useState(contacts?.datas[0]);
    const [open, setOpen] = useState(false);

    // columns
    const columns: TableColumn<any>[] = [
        {
            name: 'Name',
            selector: (row) => row?.name,
        },
        {
            name: 'Email',
            selector: (row) => row?.email,
        },
        {
            name: 'Mobile',
            selector: (row) => row?.mobile,
        },
        {
            name: 'Action',
            cell: (row) => <button type='button' className='group' onClick={() => {
                setModalData(row);
                setOpen(true)
            }}>
                <span className='flex items-center gap-[9px] text-[16px]'>
                    <BsEye className='group-hover:text-primary text-[22px]' />
                    <span className='text-[16px] font-medium group-hover:text-primary'>View</span>
                </span>
            </button>,
        },
    ];

    return (
        <>
            {/*======================= table =========================================*/}
            <div className='contacts__table'>
                <DataTable
                    columns={columns}
                    data={contacts?.datas}
                    progressPending={contactsLoading}
                    progressComponent={<TableLoader />}
                    persistTableHead={true}
                />
            </div>
            {/*======================= table =========================================*/}

            <ContactViewModal
                open={open}
                setOpen={setOpen}
                data={modalData}
            />
        </>
    );
};

export default ContactDataTable