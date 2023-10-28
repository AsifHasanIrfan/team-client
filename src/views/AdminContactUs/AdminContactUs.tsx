import FullPageLoader from '@components/Loaders/FullPageLoader/FullPageLoader';
import { useAppSelector } from '@hooks/useRedux';
import React from 'react'
import ContactDataTable from './ContactDataTable/ContactDataTable';

type Props = {}

const AdminContactUs = (props: Props) => {

    // global variable from redux
    const { auth } = useAppSelector((state) => state);

    // if token empty then loading will go on 
    if (!auth.token) return <FullPageLoader />

    return (
        <div className='bg-white py-[30px] px-3 shadow-[0px_0px_36px_rgba(0, 0, 0, 0.05)] rounded-[20px]'>
            <ContactDataTable token={auth?.token} />
        </div>
    )
}

export default AdminContactUs