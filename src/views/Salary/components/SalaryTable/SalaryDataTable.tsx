import TableLoader from '@components/Loaders/TableLoader'
import { useAppSelector } from '@hooks/useRedux'
import useSalaries from '@hooks/useSalaries'
import dayjs from 'dayjs'
import React, { useState, useEffect } from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'
import Status from '@views/Salary/partials/Status';
import { FiEdit } from 'react-icons/fi'
import SalaryEditModal from '@views/Salary/partials/SalaryEditModal/SalaryEditModal'
import { useAuth } from '@state/index'
import TableButton from '@components/TableButton'

type Props = {
    filterBy: string;
    value: string;
}

const SalaryDataTable = ({ filterBy, value }: Props) => {

    // global states
    const { auth, socket } = useAppSelector((state) => state);
    const { isAdmin } = useAuth();

    // hooks
    const { salaries, salariesLoading } = useSalaries(auth.token);

    // states
    const [open, setOpen] = useState(false);
    const [filterData, setFilterData] = useState(salaries?.datas?.salaries);
    const [modalData, setModalData] = useState(salaries?.datas[0]);

    // filter and searching
    useEffect(() => {
        if (isAdmin) {
            if (filterBy) {
                const datas = salaries?.datas?.filter((item: any) => item.status === filterBy);
                setFilterData(datas.filter((el: any) => (el.user?.firstName + ' ' + el?.user?.lastName)?.match(new RegExp(value, "i"))));
            } else {
                setFilterData(salaries?.datas?.filter((el: any) => (el.user?.firstName + ' ' + el?.user?.lastName)?.match(new RegExp(value, "i"))));
            }
        } else {
            setFilterData(salaries?.datas?.salaries)
        }
    }, [isAdmin, value, filterBy, salaries?.datas])

    // columns
    const columns: TableColumn<any>[] = [
        {
            name: 'Month',
            selector: (row) => row && dayjs(row?.startDate).format('D MMM YYYY'),
            sortable: true,
        },
        {
            name: 'User',
            selector: (row) => row && <span title={(row?.user?.firstName + ' ' + row?.user?.lastName) || undefined}>{row?.user?.firstName + ' ' + row?.user?.lastName}</span>,
            width: '150px'
        },
        {
            name: 'Amount',
            selector: (row) => row?.amount,
            cell: row => <span>${row?.amount}</span>,
            center: true
        },
        {
            name: 'Status',
            selector: (row) => row && <Status status={row?.status} />,
        },
        {
            name: 'Action',
            selector: (row) => row,
            cell: row => <TableButton data={row} setModalData={setModalData} setOpen={setOpen} edit />,
        },
    ];

    const userColumns: TableColumn<any>[] = [
        {
            name: 'Month',
            selector: (row) => row && dayjs(row?.startDate).format('D MMM YYYY'),
            sortable: true,
        },
        {
            name: 'User',
            selector: (row) => row && <span title={(salaries?.datas?.firstName + ' ' + salaries?.datas?.lastName) || undefined}>{salaries?.datas?.firstName + ' ' + salaries?.datas?.lastName}</span>,
            width: '150px'
        },
        {
            name: 'Amount',
            selector: (row) => row?.amount,
            cell: row => <span>${row?.amount}</span>,
            center: true
        },
        {
            name: 'Status',
            selector: (row) => row && <Status status={row?.status} />,
        }
    ];

    return (
        <>
            <div className="cursor-default salary__datatable">

                {/*======================= table =========================================*/}
                <DataTable
                    columns={isAdmin ? columns : userColumns}
                    data={filterData}
                    progressPending={salariesLoading}
                    progressComponent={<TableLoader />}
                    persistTableHead={true}
                />
                {/*======================= table =========================================*/}

            </div>

            <SalaryEditModal
                open={open}
                setOpen={setOpen}
                data={modalData}
                userId={modalData?.user?._id}
            />
        </>
    )
}

export default SalaryDataTable