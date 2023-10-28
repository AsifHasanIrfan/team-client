import TableLoader from '@components/Loaders/TableLoader';
import React, { useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import UserInfoRequestModal from '../UserInfoRequestModal';
import { BsEye } from 'react-icons/bs';

export type ModalRequestProps = {
    datas: any;
    token: any;
}

const ModalRequest: React.FC<ModalRequestProps> = ({ datas, token }) => {

    // states
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState([]);

    // columns
    const columns: TableColumn<any>[] = [
        {
            name: 'Name',
            selector: (row) => row?.fullname,
        },
        {
            name: 'Username',
            selector: (row) => row?.username,
        },
        {
            name: 'Action',
            cell: (row) => row &&
                <div className="flex justify-end">
                    <div
                        className="w-[65px] h-[25px] flex items-center justify-between cursor-pointer group"
                        onClick={() => {
                            setOpen(true)
                            setModalData(row)
                        }}
                    >
                        <BsEye className="w-[25px] h-[25px] group-hover:!text-primary" />
                        <p className="text-sm font-medium w-[35px] h-[22px] group-hover:!text-primary">
                            View
                        </p>
                    </div>
                </div>,
        },
    ];

    return (
        <>
            <div className="userInfoRequest__table">
                {/*======================= table =========================================*/}
                <DataTable
                    columns={columns}
                    data={datas}
                    progressPending={!token}
                    progressComponent={<TableLoader />}
                    persistTableHead={true}
                />
                {/*======================= table =========================================*/}
            </div>

            <UserInfoRequestModal data={modalData} open={open} setOpen={setOpen} />
        </>
    )
}

export default ModalRequest;