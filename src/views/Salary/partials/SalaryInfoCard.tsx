import DgCoinIcon from '@components/Icons/DgCoinIcon';
import TableLoader from '@components/Loaders/TableLoader';
import { cx } from '@config/constants';
import React from 'react';

type SalaryInfoCardProps = {
  title?: string;
  value?: any;
  drawback?: boolean;
  rewards?: boolean;
  salary?: boolean;
  totalSalary?: boolean;
  loading?: boolean;
  dgCoin?: boolean;
  taskCoinThisMonth?: boolean;
  taskCoinLastMonth?: boolean;
};

const SalaryInfoCard: React.FC<SalaryInfoCardProps> = ({
  title,
  value,
  drawback,
  rewards,
  totalSalary,
  salary,
  loading,
  dgCoin,
  taskCoinThisMonth,
  taskCoinLastMonth,
}) => {
  return (
    <div
      className={cx('w-full rounded-[5px] pl-10 pr-5 py-5 flex items-center relative justify-between',
        salary && 'bg-[#8080801f]',
        totalSalary && 'bg-[#ff950028] text-[#FF9500]',
        rewards && 'bg-[#00800021] !text-[#225022]',
        drawback && 'bg-[#ffc0cb5c] !text-[#9d0b25]',
        dgCoin && 'bg-[#FEFAED] !text-[#816400]',
        taskCoinThisMonth && 'bg-[#ff7f50]/[0.4] !text-[#ff6348]',
        taskCoinLastMonth && 'bg-[#eccc68]/[0.4] !text-[#ffa502]',
      )}
    >
      <p className="text-base font-medium">{title}:</p>
      {loading ? (
        <TableLoader className="!p-0 !m-0" />
      ) : (
        <p className={`text-2xl font-bold ${(dgCoin || taskCoinLastMonth || taskCoinThisMonth) && 'flex items-center gap-1'}`}>
          {rewards && '+'}
          {drawback && '-'}
          {(dgCoin || taskCoinLastMonth || taskCoinThisMonth) && <DgCoinIcon />}
          {(!dgCoin && !taskCoinLastMonth && !taskCoinThisMonth) && '$'}
          {value ? value : '00'}
        </p>
      )}
    </div>
  );
};

export default SalaryInfoCard;
