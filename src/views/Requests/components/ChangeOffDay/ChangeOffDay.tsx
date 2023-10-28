import TableLoader from '@components/Loaders/TableLoader';
import TableButton from '@components/TableButton';
import ChangeOffDayModal from '@views/Requests/partials/ChangeOffDayModal/ChangeOffDayModal';
import CreateRequestsModal from '@views/Requests/partials/CreateRequestsModal';
import TableTitle from '@views/Requests/partials/TableTitle'
import TaskStatus from '@views/TimeOff/components/BottomSection/TableSection/Fields/TaskStatus';
import dayjs from 'dayjs';
import React, { useState } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component';

type Props = {
    filterData: any;
    token: any;
    filterBy: any;
    setFilterBy: any;
    value: any;
    setValue: any;
    loading: any;
    userFetch: any;
    requestFetch: any;
};

const ChangeOffDay = ({ filterData, token, filterBy, setFilterBy, value, setValue, loading, userFetch, requestFetch }: Props) => {

    // states
    const [open, setOpen] = useState<boolean>(false);
    const [modalData, setModalData] = useState(filterData[0] || '');

    // columns
    const columns: TableColumn<any>[] = [
        {
            name: 'Username',
            selector: (row) => row?.user?.username,
        },
        {
            name: 'Request Day Off',
            selector: (row) => row?.day,
        },
        {
            name: 'Requested Date',
            selector: (row) => row && <>
                {dayjs(row?.createdAt).format("DD-MM-YYYY ddd")}
            </>,
        },
        {
            name: 'Status',
            selector: (row) => row && row && <TaskStatus status={row.status} />,
        },
        {
            name: 'Actions',
            cell: (row) => <TableButton data={row} setOpen={setOpen} setModalData={setModalData} />,
        },
    ];


    return (
        <>

            <TableTitle
                pageTitle='Forget Password'
                setFilterBy={setFilterBy}
                filterBy={filterBy}
                value={value}
                setValue={setValue}
                isSearchFieldRequired={true}
                isFilterTabRequired={true}
            />

            <div className="passwordRequest__table">
                {/*======================= table =========================================*/}
                <DataTable
                    columns={columns}
                    data={filterData}
                    progressPending={!token || loading}
                    progressComponent={<TableLoader />}
                    persistTableHead={true}
                />
                {/*======================= table =========================================*/}
            </div>

            {/* <ChangeOffDayModal
                data={modalData}
                open={open}
                setOpen={setOpen}
                token={token}
                userFetch={userFetch}
                requestFetch={requestFetch}
            /> */}

            <CreateRequestsModal userId={modalData?.user?._id} data={modalData} open={open} setOpen={setOpen} />
        </>
    )
}

export default ChangeOffDay