import { cx } from '@config/constants';
import React from 'react'

type Props = {
  status?: string;
  isAdmin?: any;
}

const StatusField = ({ status, isAdmin }: Props) => {

  return (
    <div
      className={cx(
        'flex items-center justify-center w-full px-10 xl:w-[130px] rounded-[5px]',
        status === 'In Progress' && 'bg-[rgba(255,_149,_0,_0.1)]',
        status === 'Assigned' && 'bg-[rgba(255,_149,_0,_0.1)]',
        status === 'Completed Late' && 'bg-[rgba(0,_50,_255,_0.1)]',
        status === 'Blocked' && 'bg-[rgba(0,_0,_0,_0.1)]',
        status === 'Completed' && 'bg-[rgba(0,_50,_255,_0.1)]',
        status === 'Approved' && 'bg-[rgba(33,_185,_121,_0.1)]',
        status === 'Approved Late' && 'bg-[rgba(33,_185,_121,_0.1)]',
        status === 'Completed' && 'bg-[rgba(0,_50,_255,_0.1)]',
        status === 'In Revision' && 'bg-[rgba(143,_0,_255,_0.1)]'
      )}
    >
      <p
        className={cx(
          'text-[#2D2B2B] text-center rounded-[6px] px-3 py-2 text-sm leading-5 ',
          status === 'In Progress' && 'text-[rgba(255,_149,_0,_1)]',
          status === 'Assigned' && 'text-[rgba(255,_149,_0,_1)]',
          status === 'Blocked' && 'text-[#000000]',
          status === 'Completed Late' && 'text-[rgba(0,_50,_255,_1)]',
          status === 'Completed' && 'text-[rgba(0,_50,_255,_1)]',
          status === 'Approved' && 'text-[rgba(33,_185,_121,_1)]',
          status === 'Approved Late' && 'text-[rgba(33,_185,_121,_1)]',
          status === 'Completed' && 'text-[rgba(0,_50,_255,_1)]',
          status === 'In Revision' && 'text-[rgba(143,_0,_255,_1)]'
        )}
      >
        {status === 'Completed'
          ? isAdmin
            ? 'Completed'
            : 'In Review'
          : status === 'Completed Late'
            ? 'In Review - Late'
            : status}
      </p>
    </div>
  );
}

export default StatusField