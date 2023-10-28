import DgCoinIcon from '@components/Icons/DgCoinIcon';
import TableLoader from '@components/Loaders/TableLoader';
import useAssignedBenefit from '@hooks/useAssignedBenefit';
import BenefitEditModal from '@views/AddBenefits/partials/BenefitEditModal/BenefitEditModal';
import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { FiEdit } from 'react-icons/fi';

type Props = {
  token: string;
}

const BenefitsTable = ({ token }: Props) => {
  const [open, setOpen] = useState(false);
  
  // hooks
  const { assignedBenefits, assignedBenefitsLoading } = useAssignedBenefit(token);
  const [modalData, setModalData] = useState(assignedBenefits?.datas?.[0]);

  // columns
  const columns: TableColumn<any>[] = [
    {
      name: 'User Name',
      selector: (row) => row && `${row.user.firstName} ${row.user.lastName}`,
    },
    {
      name: 'Benefit Title',
      selector: (row) =>
        row && <span title={`${row.benefit.title}`}>{row.benefit.title}</span>,
    },
    {
      name: 'Cost of DG',
      selector: (row) =>
        row && (
          <span className="flex gap-2 items-center">
            <DgCoinIcon />
            {row.benefit.dgCost}
          </span>
        ),
    },
    {
      name: 'Action',
      selector: (row) => row,
      cell: (row) => (
        <button
          type="button"
          className="group"
          onClick={() => {
            setModalData(row);
            setOpen(true);
          }}
        >
          <span className="flex items-center gap-[9px] text-[16px]">
            <FiEdit className="group-hover:text-primary text-[16px]" />
            <span className="text-[16px] font-medium group-hover:text-primary">
              Edit
            </span>
          </span>
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="w-full" id="benefit-table">
        <DataTable
          columns={columns}
          data={assignedBenefits?.datas}
          // progressPending={salariesLoading}
          progressComponent={<TableLoader />}
          persistTableHead={true}
        />
      </div>

      <BenefitEditModal open={open} setOpen={setOpen} data={modalData} />
    </>
  );
};
export default BenefitsTable;