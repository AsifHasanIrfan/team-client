import TableLoader from '@components/Loaders/TableLoader';
import TableButton from '@components/TableButton';
import React, { useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';
import ReportModal from '../ReportModal/ReportModal';

type Props = {
    datas: any;
    loading: boolean;
}

const ReportsTable = ({ loading, datas }: Props) => {

    // states
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState([]);

    // columns
    const columns: TableColumn<any>[] = [
        {
            name: 'Reported By',
            selector: (row) => row?.user?.firstName + ' ' + row?.user?.lastName,
        },
        {
            name: 'Reported To',
            selector: (row) => row?.member?.firstName + ' ' + row?.member?.lastName,
        },
        {
            name: 'Date',
            selector: (row) => row?.createdAt.slice(0, 10),
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row) => <TableButton
                data={row}
                setOpen={setOpen}
                setModalData={setModalData}
            />,
        },
    ];

    return (
        <>
            <div className='users__management'>
                {/*======================= table =========================================*/}
                <DataTable
                    columns={columns}
                    data={datas}
                    progressPending={loading}
                    progressComponent={<TableLoader />}
                    persistTableHead={true}
                />
                {/*======================= table =========================================*/}

                {/* report modal */}
                <ReportModal
                    data={modalData}
                    open={open}
                    setOpen={setOpen}
                />
            </div>
        </>
    )
}

export default ReportsTable